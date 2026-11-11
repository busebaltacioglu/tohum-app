package org.tohum.mobile.core.wearable

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothGatt
import android.bluetooth.BluetoothGattCallback
import android.bluetooth.BluetoothGattCharacteristic
import android.bluetooth.BluetoothProfile
import android.content.Context
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import org.tohum.mobile.core.model.ConnectionStatus
import java.util.UUID

/**
 * Direct Bluetooth Low Energy (BLE) GATT Bridge.
 * Connects directly to smartwatches broadcasting standard Bluetooth SIG Heart Rate Service (0x180D)
 * and extracts continuous pulse and R-R interval telemetry to evaluate autonomic HRV.
 */
class BleGattWearableBridge(private val context: Context) {

    companion object {
        val HEART_RATE_SERVICE_UUID: UUID = UUID.fromString("0000180D-0000-1000-8000-00805F9B34FB")
        val HEART_RATE_MEASUREMENT_CHAR_UUID: UUID = UUID.fromString("00002A37-0000-1000-8000-00805F9B34FB")
        val CLIENT_CHARACTERISTIC_CONFIG_UUID: UUID = UUID.fromString("00002902-0000-1000-8000-00805F9B34FB")
    }

    private val _connectionStatus = MutableStateFlow(ConnectionStatus.DISCONNECTED)
    val connectionStatus: StateFlow<ConnectionStatus> = _connectionStatus.asStateFlow()

    private val _currentHeartRate = MutableStateFlow(78)
    val currentHeartRate: StateFlow<Int> = _currentHeartRate.asStateFlow()

    private val _calculatedHrvMs = MutableStateFlow(64)
    val calculatedHrvMs: StateFlow<Int> = _calculatedHrvMs.asStateFlow()

    private var activeGatt: BluetoothGatt? = null
    private val rrIntervalBuffer = ArrayDeque<Int>()

    private val gattCallback = object : BluetoothGattCallback() {
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            when (newState) {
                BluetoothProfile.STATE_CONNECTED -> {
                    _connectionStatus.value = ConnectionStatus.CONNECTED
                    gatt.discoverServices()
                }
                BluetoothProfile.STATE_DISCONNECTED -> {
                    _connectionStatus.value = ConnectionStatus.DISCONNECTED
                    activeGatt = null
                }
            }
        }

        override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                val service = gatt.getService(HEART_RATE_SERVICE_UUID)
                val characteristic = service?.getCharacteristic(HEART_RATE_MEASUREMENT_CHAR_UUID)
                if (characteristic != null) {
                    gatt.setCharacteristicNotification(characteristic, true)
                }
            }
        }

        @Deprecated("Deprecated in Java")
        override fun onCharacteristicChanged(gatt: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
            if (characteristic.uuid == HEART_RATE_MEASUREMENT_CHAR_UUID) {
                parseHeartRateAndRrIntervals(characteristic.value)
            }
        }
    }

    private fun parseHeartRateAndRrIntervals(data: ByteArray?) {
        if (data == null || data.isEmpty()) return

        val flags = data[0].toInt()
        val is16Bit = (flags and 0x01) != 0
        val hasRrIntervals = (flags and 0x10) != 0

        var offset = 1
        val heartRate = if (is16Bit && data.size >= 3) {
            val hr = (data[offset].toInt() and 0xFF) or ((data[offset + 1].toInt() and 0xFF) shl 8)
            offset += 2
            hr
        } else {
            val hr = data[offset].toInt() and 0xFF
            offset += 1
            hr
        }

        _currentHeartRate.value = heartRate

        // Parse R-R intervals if present (resolution: 1/1024 second = ~0.976 ms)
        if (hasRrIntervals) {
            while (offset + 1 < data.size) {
                val rrRaw = (data[offset].toInt() and 0xFF) or ((data[offset + 1].toInt() and 0xFF) shl 8)
                val rrMs = (rrRaw * 1000) / 1024
                offset += 2

                rrIntervalBuffer.addLast(rrMs)
                if (rrIntervalBuffer.size > 30) {
                    rrIntervalBuffer.removeFirst()
                }
            }

            // Compute standard deviation of NN/RR intervals (SDNN) as HRV surrogate
            if (rrIntervalBuffer.size >= 10) {
                val mean = rrIntervalBuffer.average()
                val variance = rrIntervalBuffer.map { (it - mean) * (it - mean) }.average()
                val sdnn = kotlin.math.sqrt(variance).toInt().coerceIn(35, 120)
                _calculatedHrvMs.value = sdnn
            }
        }
    }

    fun disconnect() {
        try {
            activeGatt?.close()
            activeGatt = null
            _connectionStatus.value = ConnectionStatus.DISCONNECTED
        } catch (e: SecurityException) {
            e.printStackTrace()
        }
    }
}
