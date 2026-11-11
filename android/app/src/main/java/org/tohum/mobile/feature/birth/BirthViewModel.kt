package org.tohum.mobile.feature.birth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class ContractionRecord(
    val timestampFormatted: String,
    val durationSeconds: Int,
    val intervalMinutes: Int
)

data class BirthUiState(
    val cardiffKicksToday: Int = 10,
    val isCardiffComplete: Boolean = true,
    val isTimingWave: Boolean = false,
    val currentWaveSeconds: Int = 0,
    val waveHistory: List<ContractionRecord> = listOf(
        ContractionRecord("14:20", 52, 7),
        ContractionRecord("14:28", 58, 8),
        ContractionRecord("14:35", 62, 7)
    ),
    val isFiveOneOneRuleMet: Boolean = false,
    val hospitalBagItemsPacked: Int = 12,
    val hospitalBagItemsTotal: Int = 14
)

class BirthViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(BirthUiState())
    val uiState: StateFlow<BirthUiState> = _uiState.asStateFlow()

    private var timerJob: Job? = null

    fun addKick() {
        _uiState.update { state ->
            val kicks = state.cardiffKicksToday + 1
            state.copy(
                cardiffKicksToday = kicks,
                isCardiffComplete = kicks >= 10
            )
        }
    }

    fun toggleContractionWave() {
        if (_uiState.value.isTimingWave) {
            // Stop wave and save record
            timerJob?.cancel()
            val duration = _uiState.value.currentWaveSeconds
            val newRecord = ContractionRecord(
                timestampFormatted = "Şimdi",
                durationSeconds = duration,
                intervalMinutes = 6
            )
            val updatedHistory = listOf(newRecord) + _uiState.value.waveHistory

            // Evaluate 5-1-1 rule: >= 3 recent contractions < 5 min apart, lasting ~60s
            val is511 = updatedHistory.take(3).all { it.durationSeconds >= 50 && it.intervalMinutes <= 6 }

            _uiState.update {
                it.copy(
                    isTimingWave = false,
                    currentWaveSeconds = 0,
                    waveHistory = updatedHistory,
                    isFiveOneOneRuleMet = is511
                )
            }
        } else {
            // Start wave timer
            _uiState.update { it.copy(isTimingWave = true, currentWaveSeconds = 0) }
            timerJob = viewModelScope.launch {
                while (true) {
                    delay(1000)
                    _uiState.update { it.copy(currentWaveSeconds = it.currentWaveSeconds + 1) }
                }
            }
        }
    }
}
