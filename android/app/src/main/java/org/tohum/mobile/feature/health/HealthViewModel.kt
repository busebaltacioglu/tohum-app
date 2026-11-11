package org.tohum.mobile.feature.health

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import org.tohum.mobile.core.clinical.CardiovascularBaselineEvaluator
import org.tohum.mobile.core.model.BaselineVitals
import org.tohum.mobile.core.model.BloodPressureRecord
import org.tohum.mobile.core.model.BpEvaluationResult
import org.tohum.mobile.core.model.IomWeightRecord
import org.tohum.mobile.core.wearable.WearableRepository

data class HealthUiState(
    val baseline: BaselineVitals = BaselineVitals(90, 60, 72),
    val latestBp: BloodPressureRecord = BloodPressureRecord(systolic = 92, diastolic = 62, pulseBpm = 74),
    val bpEvaluation: BpEvaluationResult = CardiovascularBaselineEvaluator.evaluate(
        systolic = 92,
        diastolic = 62,
        pulseBpm = 74,
        hrvMs = 64
    ),
    val weightRecord: IomWeightRecord = IomWeightRecord(
        week = 31,
        prePregnancyWeightKg = 58.0,
        currentWeightKg = 65.0,
        heightCm = 168.0,
        minTargetWeightKg = 64.0,
        maxTargetWeightKg = 67.5,
        isWithinCorridor = true
    ),
    val history: List<BloodPressureRecord> = listOf(
        BloodPressureRecord(systolic = 92, diastolic = 62, pulseBpm = 74, note = "Sabah Dinlenik"),
        BloodPressureRecord(systolic = 88, diastolic = 58, pulseBpm = 70, note = "Akşam Rahatlama"),
        BloodPressureRecord(systolic = 94, diastolic = 64, pulseBpm = 76, note = "Yürüyüş Sonrası")
    )
)

class HealthViewModel(
    private val wearableRepository: WearableRepository? = null
) : ViewModel() {

    private val _uiState = MutableStateFlow(HealthUiState())
    val uiState: StateFlow<HealthUiState> = _uiState.asStateFlow()

    init {
        wearableRepository?.let { repo ->
            viewModelScope.launch {
                repo.biometrics.collect { biometrics ->
                    // Re-evaluate if HRV updates
                    _uiState.update { state ->
                        state.copy(
                            bpEvaluation = CardiovascularBaselineEvaluator.evaluate(
                                systolic = state.latestBp.systolic,
                                diastolic = state.latestBp.diastolic,
                                pulseBpm = biometrics.liveHeartRateBpm,
                                hrvMs = biometrics.autonomicHrvMs,
                                baseline = state.baseline
                            )
                        )
                    }
                }
            }
        }
    }

    fun logNewBp(systolic: Int, diastolic: Int, pulse: Int) {
        val newRecord = BloodPressureRecord(systolic = systolic, diastolic = diastolic, pulseBpm = pulse)
        val eval = CardiovascularBaselineEvaluator.evaluate(
            systolic = systolic,
            diastolic = diastolic,
            pulseBpm = pulse,
            baseline = _uiState.value.baseline
        )

        _uiState.update { state ->
            state.copy(
                latestBp = newRecord,
                bpEvaluation = eval,
                history = listOf(newRecord) + state.history
            )
        }
    }
}
