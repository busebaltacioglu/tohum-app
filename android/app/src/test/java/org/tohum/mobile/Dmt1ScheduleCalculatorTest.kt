package org.tohum.mobile

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import org.tohum.mobile.core.clinical.Dmt1ScheduleCalculator
import org.tohum.mobile.core.model.Dmt1SupplementItem
import org.tohum.mobile.core.model.NutrientClass

class Dmt1ScheduleCalculatorTest {

    @Test
    fun testDefaultScheduleIsDmt1Safe() {
        val schedule = Dmt1ScheduleCalculator.getDefaultPrescriptionSchedule(hasCollagen = true)
        val evaluation = Dmt1ScheduleCalculator.evaluateSchedule(schedule)

        assertTrue("Default schedule must be DMT-1 compliant", evaluation.isDmt1Safe)
        assertEquals(0, evaluation.conflicts.size)
    }

    @Test
    fun testDetectsCationConflictWhenBufferViolated() {
        // Iron at 08:30 and Magnesium at 09:30 (only 1 hour separation -> violates 2.0h buffer)
        val conflictingList = listOf(
            Dmt1SupplementItem(
                id = "iron",
                commercialName = "Ferro Sanol Duodenal",
                genericName = "Demir (II) Glisin Sülfat",
                nutrientClass = NutrientClass.DIVALENT_IRON,
                scheduledTime = "08:30",
                dosageInstruction = "Sabah Aç",
                absorptionSynergyTip = "C vitamini ile için"
            ),
            Dmt1SupplementItem(
                id = "magnesium",
                commercialName = "Magnimore Plus",
                genericName = "Magnezyum Bisglisinat",
                nutrientClass = NutrientClass.DIVALENT_MAGNESIUM,
                scheduledTime = "09:30",
                dosageInstruction = "Sabah",
                absorptionSynergyTip = "Suyla için"
            )
        )

        val evaluation = Dmt1ScheduleCalculator.evaluateSchedule(conflictingList)

        assertFalse("Must flag conflict when separation is < 2.0 hours", evaluation.isDmt1Safe)
        assertEquals(1, evaluation.conflicts.size)
        assertEquals(1.0, evaluation.conflicts[0].timeDifferenceHours, 0.01)
    }

    @Test
    fun testCircularBufferMidnightWrap() {
        // 23:30 and 00:45 -> 1 hour and 15 mins (1.25 hours) across midnight
        val diff = Dmt1ScheduleCalculator.computeCircularBufferHours("23:30", "00:45")
        assertEquals(1.25, diff, 0.01)
    }
}
