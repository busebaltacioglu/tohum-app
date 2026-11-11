package org.tohum.mobile.feature.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.tohum.mobile.core.clinical.Dmt1ScheduleCalculator
import org.tohum.mobile.core.model.Dmt1SupplementItem
import org.tohum.mobile.core.model.HydrationStatus
import org.tohum.mobile.core.model.MaternalProfile

data class HomeUiState(
    val profile: MaternalProfile = MaternalProfile(),
    val hydration: HydrationStatus = HydrationStatus(),
    val supplements: List<Dmt1SupplementItem> = Dmt1ScheduleCalculator.getDefaultPrescriptionSchedule(hasCollagen = true),
    val isAudioResonancePlaying: Boolean = false,
    val kickCountToday: Int = 14,
    val emotionalTone: String = "Dingin & Güvende",
    val statusWhisper: String = "Güneş 31. haftasında amniyon sıvısının sıcak ritminde dinleniyor."
)

class HomeViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    fun toggleAudioResonance() {
        _uiState.update { it.copy(isAudioResonancePlaying = !it.isAudioResonancePlaying) }
    }

    fun incrementWater() {
        _uiState.update { state ->
            val newCount = (state.hydration.currentGlasses + 1).coerceAtMost(12)
            state.copy(hydration = state.hydration.copy(currentGlasses = newCount))
        }
    }

    fun toggleSupplementTaken(id: String) {
        _uiState.update { state ->
            val updated = state.supplements.map { item ->
                if (item.id == id) {
                    item.copy(
                        takenToday = !item.takenToday,
                        takenTime = if (!item.takenToday) "Şimdi" else null
                    )
                } else {
                    item
                }
            }
            state.copy(supplements = updated)
        }
    }

    fun registerKick() {
        _uiState.update { it.copy(kickCountToday = it.kickCountToday + 1) }
    }
}
