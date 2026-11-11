package org.tohum.mobile.core.model

import kotlinx.serialization.Serializable

enum class WearableSource {
    HEALTH_CONNECT,
    BLUETOOTH_LE_GATT,
    WEAR_OS_COMPANION,
    EMULATOR_SENSOR
}

enum class ConnectionStatus {
    DISCONNECTED,
    CONNECTING,
    CONNECTED,
    SYNCING
}

@Serializable
data class WearableDevice(
    val id: String = "wearable_primary",
    val name: String = "Google Pixel Watch / Health Connect",
    val source: WearableSource = WearableSource.HEALTH_CONNECT,
    val status: ConnectionStatus = ConnectionStatus.CONNECTED,
    val batteryPct: Int = 88,
    val lastSyncFormatted: String = "Şimdi (Canlı)"
)

@Serializable
data class WearableBiometrics(
    val liveHeartRateBpm: Int = 78,
    val restingHeartRateBpm: Int = 71,
    val autonomicHrvMs: Int = 64, // SDNN (ms)
    val bloodOxygenSpo2Pct: Double = 98.2,
    val skinTemperatureCelsius: Double = 36.6,
    val sleepDurationFormatted: String = "7s 25dk",
    val deepSleepMinutes: Int = 98,
    val dailySteps: Int = 4820,
    val timestampMillis: Long = System.currentTimeMillis()
)
