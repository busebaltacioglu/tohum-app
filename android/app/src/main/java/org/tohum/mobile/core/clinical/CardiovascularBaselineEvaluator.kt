package org.tohum.mobile.core.clinical

import org.tohum.mobile.core.model.BaselineVitals
import org.tohum.mobile.core.model.BpEvaluationLevel
import org.tohum.mobile.core.model.BpEvaluationResult

object CardiovascularBaselineEvaluator {

    /**
     * Evaluates a blood pressure reading against the mother's personalized baseline.
     */
    fun evaluate(
        systolic: Int,
        diastolic: Int,
        pulseBpm: Int,
        hrvMs: Int = 64,
        baseline: BaselineVitals = BaselineVitals(90, 60, 72)
    ): BpEvaluationResult {
        val deltaSys = systolic - baseline.systolic
        val deltaDia = diastolic - baseline.diastolic

        // Absolute hypertension threshold
        if (systolic >= 140 || diastolic >= 90) {
            return BpEvaluationResult(
                level = BpEvaluationLevel.CRITICAL_OBSERVATION,
                message = "Tansiyon değeriniz ($systolic/$diastolic mmHg) klinik izlem eşiğindedir. Lütfen sol yanınıza uzanın, dinlenin ve hekiminize danışın.",
                deltaSystolic = deltaSys,
                deltaDiastolic = deltaDia,
                isSafe = false
            )
        }

        // Relative delta threshold (+25 / +18 mmHg deviation from personal baseline)
        if ((deltaSys >= 25 && deltaDia >= 18) || (systolic >= 120 && hrvMs < 50)) {
            return BpEvaluationResult(
                level = BpEvaluationLevel.ATYPICAL_ELEVATION,
                message = "AI Seed Core Kişisel Koridor Tespiti: $systolic/$diastolic mmHg değeri genel popülasyonda standart kabul edilse de, sizin ${baseline.displayString} kişisel bazaliniz için +$deltaSys/+$deltaDia mmHg'lik bir sıçramadır. Otonom HRV ($hrvMs ms) vasküler yorgunluğa işaret ediyor. Sol yanınıza uzanın, 1 bardak ılık su için ve 1 saat sonra tekrar ölçün.",
                deltaSystolic = deltaSys,
                deltaDiastolic = deltaDia,
                isSafe = false
            )
        }

        // Slight elevation
        if (deltaSys >= 15 || deltaDia >= 12) {
            return BpEvaluationResult(
                level = BpEvaluationLevel.ACCEPTABLE_MODERATE,
                message = "Hafif gün içi hareketlilik ($systolic/$diastolic mmHg). Kişisel bazalinizle uyumlu, amniyotik sıvı dengesi için su tüketiminizi sürdürün.",
                deltaSystolic = deltaSys,
                deltaDiastolic = deltaDia,
                isSafe = true
            )
        }

        // Optimal personalized corridor
        return BpEvaluationResult(
            level = BpEvaluationLevel.OPTIMAL_CORRIDOR,
            message = "Mükemmel Uyum: Ölçümünüz ($systolic/$diastolic mmHg), ${baseline.displayString} kişisel bazaliniz ve $hrvMs ms otonom HRV ritminizle kusursuz örtüşüyor.",
            deltaSystolic = deltaSys,
            deltaDiastolic = deltaDia,
            isSafe = true
        )
    }
}
