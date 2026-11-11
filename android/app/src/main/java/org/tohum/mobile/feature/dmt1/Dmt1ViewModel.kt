package org.tohum.mobile.feature.dmt1

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.tohum.mobile.core.clinical.Dmt1ScheduleCalculator
import org.tohum.mobile.core.model.Dmt1DailySchedule
import org.tohum.mobile.core.model.Dmt1SupplementItem
import org.tohum.mobile.core.network.TohumApiClient

data class Dmt1UiState(
    val schedule: Dmt1DailySchedule = Dmt1ScheduleCalculator.evaluateSchedule(
        Dmt1ScheduleCalculator.getDefaultPrescriptionSchedule(hasCollagen = true)
    ),
    val isUploadModalOpen: Boolean = false,
    val isAddingCustom: Boolean = false,
    val ePrescriptionCodeInput: String = "",
    val syncStatusText: String = "Klinik Farmakoloji Motoru Devrede ✓"
)

class Dmt1ViewModel(
    private val apiClient: TohumApiClient = TohumApiClient()
) : ViewModel() {

    private val _uiState = MutableStateFlow(Dmt1UiState())
    val uiState: StateFlow<Dmt1UiState> = _uiState.asStateFlow()

    fun updateSupplementTime(id: String, newTime: String) {
        _uiState.update { state ->
            val updatedList = state.schedule.supplements.map { item ->
                if (item.id == id) item.copy(scheduledTime = newTime) else item
            }
            val reEvaluated = Dmt1ScheduleCalculator.evaluateSchedule(updatedList)
            state.copy(schedule = reEvaluated)
        }
    }

    fun addSupplement(item: Dmt1SupplementItem) {
        _uiState.update { state ->
            val newList = state.schedule.supplements + item
            val reEvaluated = Dmt1ScheduleCalculator.evaluateSchedule(newList)
            state.copy(schedule = reEvaluated, isAddingCustom = false)
        }
    }

    fun syncWithBackend() {
        viewModelScope.launch {
            _uiState.update { it.copy(syncStatusText = "E-Reçete Senkronize Ediliyor...") }
            val supplementIds = _uiState.value.schedule.supplements.map { it.id }
            val success = apiClient.integratePrescription(supplementIds, hasCollagen = true)
            _uiState.update {
                it.copy(
                    syncStatusText = if (success) "Sunucu ile Tam Senkronize ✓" else "Yerel DMT-1 Motoru Aktif (Çevrimdışı)"
                )
            }
        }
    }
}
