package org.tohum.mobile.core.model

import kotlinx.serialization.Serializable

@Serializable
data class BloodPressureRecord(
    val timestampMillis: Long = System.currentTimeMillis(),
    val systolic: Int,
    val diastolic: Int,
    val pulseBpm: Int,
    val note: String = ""
) {
    val displayValue: String get() = "$systolic/$diastolic"
}

enum class BpEvaluationLevel {
    OPTIMAL_CORRIDOR,       // Matching personalized baseline (e.g. 90/60)
    ACCEPTABLE_MODERATE,    // Slight diurnal variation
    ATYPICAL_ELEVATION,     // Rise of +25/+18 from personal baseline (triggers non-alarmist rest cue)
    CRITICAL_OBSERVATION    // >140/90 or urgent clinical alert
}

@Serializable
data class BpEvaluationResult(
    val level: BpEvaluationLevel,
    val message: String,
    val deltaSystolic: Int,
    val deltaDiastolic: Int,
    val isSafe: Boolean
)

@Serializable
data class IomWeightRecord(
    val week: Int,
    val prePregnancyWeightKg: Double,
    val currentWeightKg: Double,
    val heightCm: Double,
    val minTargetWeightKg: Double,
    val maxTargetWeightKg: Double,
    val isWithinCorridor: Boolean
)

@Serializable
data class HydrationStatus(
    val currentGlasses: Int = 4,
    val targetGlasses: Int = 8,
    val amnioticIndexState: String = "Optimal Denge"
)
