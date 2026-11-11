package org.tohum.mobile.feature.wearable

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.tohum.mobile.core.model.WearableBiometrics
import org.tohum.mobile.core.model.WearableDevice
import org.tohum.mobile.core.wearable.WearableRepository

data class WearableUiState(
    val device: WearableDevice = WearableDevice(),
    val biometrics: WearableBiometrics = WearableBiometrics(),
    val isHealthConnectReady: Boolean = true,
    val isSyncing: Boolean = false
)

class WearableViewModel(
    private val repository: WearableRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(WearableUiState())
    val uiState: StateFlow<WearableUiState> = _uiState.asStateFlow()

    init {
        _uiState.update { it.copy(isHealthConnectReady = repository.isHealthConnectAvailable()) }

        viewModelScope.launch {
            repository.device.collect { dev ->
                _uiState.update { it.copy(device = dev) }
            }
        }

        viewModelScope.launch {
            repository.biometrics.collect { bio ->
                _uiState.update { it.copy(biometrics = bio) }
            }
        }
    }

    fun syncNow() {
        viewModelScope.launch {
            _uiState.update { it.copy(isSyncing = true) }
            repository.refreshBiometrics()
            _uiState.update { it.copy(isSyncing = false) }
        }
    }
}
