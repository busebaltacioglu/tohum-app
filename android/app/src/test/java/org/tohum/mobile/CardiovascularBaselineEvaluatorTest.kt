package org.tohum.mobile

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import org.tohum.mobile.core.clinical.CardiovascularBaselineEvaluator
import org.tohum.mobile.core.model.BaselineVitals
import org.tohum.mobile.core.model.BpEvaluationLevel

class CardiovascularBaselineEvaluatorTest {

    private val buseBaseline = BaselineVitals(systolic = 90, diastolic = 60, restingHeartRate = 72)

    @Test
    fun testOptimalCorridorForBuseBaseline() {
        val result = CardiovascularBaselineEvaluator.evaluate(
            systolic = 92,
            diastolic = 62,
            pulseBpm = 74,
            baseline = buseBaseline
        )

        assertEquals(BpEvaluationLevel.OPTIMAL_CORRIDOR, result.level)
        assertTrue(result.isSafe)
        assertEquals(2, result.deltaSystolic)
        assertEquals(2, result.deltaDiastolic)
    }

    @Test
    fun testAtypicalElevationDetectedUnderAbsoluteHypertension() {
        // 118/80 is normal in general pop (<140/90), but for 90/60 baseline it's +28/+20 mmHg
        val result = CardiovascularBaselineEvaluator.evaluate(
            systolic = 118,
            diastolic = 80,
            pulseBpm = 82,
            baseline = buseBaseline
        )

        assertEquals(BpEvaluationLevel.ATYPICAL_ELEVATION, result.level)
        assertFalse("Atypical elevation should trigger rest & re-evaluation", result.isSafe)
        assertEquals(28, result.deltaSystolic)
        assertEquals(20, result.deltaDiastolic)
    }

    @Test
    fun testAbsoluteHypertensionTriggersCriticalObservation() {
        val result = CardiovascularBaselineEvaluator.evaluate(
            systolic = 145,
            diastolic = 94,
            pulseBpm = 95,
            baseline = buseBaseline
        )

        assertEquals(BpEvaluationLevel.CRITICAL_OBSERVATION, result.level)
        assertFalse(result.isSafe)
    }
}
