package org.tohum.mobile.core.model

import kotlinx.serialization.Serializable

enum class NutrientClass {
    DIVALENT_IRON,         // Fe2+ (competes for DMT-1 apical transporter)
    DIVALENT_MAGNESIUM,    // Mg2+ (competes with Fe2+ / Ca2+)
    DIVALENT_CALCIUM,      // Ca2+ (potent competitive inhibitor of DMT-1)
    PEPTIDE_COLLAGEN,      // Hydrolyzed collagen peptides
    LIPID_OMEGA3,          // DHA/EPA
    LIPID_VITAMIN_D3,      // Cholecalciferol
    COFACTOR_VITAMIN_C,    // Enhances Fe3+ -> Fe2+ reduction
    FOLATE_METHYLFOLATE    // Neural tube coenzyme
}

@Serializable
data class Dmt1SupplementItem(
    val id: String,
    val commercialName: String,
    val genericName: String,
    val nutrientClass: NutrientClass,
    val scheduledTime: String,      // "HH:mm", e.g. "08:30"
    val dosageInstruction: String,
    val absorptionSynergyTip: String,
    val takenToday: Boolean = false,
    val takenTime: String? = null
)

@Serializable
data class Dmt1ConflictWarning(
    val primarySupplement: String,
    val conflictingSupplement: String,
    val timeDifferenceHours: Double,
    val requiredBufferHours: Double = 2.0,
    val clinicalExplanation: String
)

@Serializable
data class Dmt1DailySchedule(
    val supplements: List<Dmt1SupplementItem>,
    val conflicts: List<Dmt1ConflictWarning>,
    val isDmt1Safe: Boolean,
    val recommendationSummary: String
)
