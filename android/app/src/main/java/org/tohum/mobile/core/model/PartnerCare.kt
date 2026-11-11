package org.tohum.mobile.core.model

import kotlinx.serialization.Serializable

@Serializable
enum class CareEventType {
    VITAL_SYNC,
    NUTRITION_HYDRATION,
    EVENING_CARE_MASSAGE,
    PRESCRIPTION_SYNC,
    EMPATHY_WHISPER
}

@Serializable
data class PartnerLiveFeedItem(
    val id: String,
    val timestamp: String,
    val type: CareEventType,
    val title: String,
    val message: String,
    val actionSuggestion: String? = null
)

@Serializable
data class EmpathyActionCard(
    val id: String,
    val title: String,
    val subtitle: String,
    val iconName: String,
    val promptText: String,
    val isCompleted: Boolean = false
)
