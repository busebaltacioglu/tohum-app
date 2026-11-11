package org.tohum.mobile.feature.partner

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import org.tohum.mobile.core.model.CareEventType
import org.tohum.mobile.core.model.EmpathyActionCard
import org.tohum.mobile.core.model.PartnerInfo
import org.tohum.mobile.core.model.PartnerLiveFeedItem

data class PartnerUiState(
    val partner: PartnerInfo = PartnerInfo(
        fullName = "Oğuz Baltacıoğlu",
        shortName = "Oğuz",
        phone = "+90 532 000 00 00",
        inviteCode = "THM-31G-834",
        status = "connected"
    ),
    val motherName: String = "Buse",
    val liveFeed: List<PartnerLiveFeedItem> = listOf(
        PartnerLiveFeedItem(
            id = "1",
            timestamp = "09:15",
            type = CareEventType.VITAL_SYNC,
            title = "Sabah Dinlenik Tansiyon Uyum Onayı",
            message = "Buse'nin sabah tansiyonu (92/62 mmHg) kendi 90/60 bazaliyle tam uyumlu. Güneş'in ritmi huzurlu.",
            actionSuggestion = "Hafif bir tebessüm ve sarılma yeterli."
        ),
        PartnerLiveFeedItem(
            id = "2",
            timestamp = "13:30",
            type = CareEventType.PRESCRIPTION_SYNC,
            title = "DMT-1 Öğle Takviyesi Alındı",
            message = "Omega-3 ve D3 öğle yemeğiyle birlikte alındı. Biyo-yararlanım maksimumda."
        ),
        PartnerLiveFeedItem(
            id = "3",
            timestamp = "20:45",
            type = CareEventType.EVENING_CARE_MASSAGE,
            title = "Akşam Şefkat Çağrısı (31. Hafta)",
            message = "Ağırlık merkezi öne kaydığı için Buse'nin bel ve sakrum bölgesine 10 dk ılık dokunuş ve masaj çok iyi gelecektir.",
            actionSuggestion = "Lavanta veya tatlı badem yağıyla nazik dairesel masaj yapabilirsin."
        )
    ),
    val empathyCards: List<EmpathyActionCard> = listOf(
        EmpathyActionCard(
            id = "c1",
            title = "Akşam Bel Masajı",
            subtitle = "31. Hafta Sakrum Desteği",
            iconName = "spa",
            promptText = "Buse'nin beline 10 dakika hafif dairesel masaj yaparak gevşemesini sağla."
        ),
        EmpathyActionCard(
            id = "c2",
            title = "Su Hatırlatması",
            subtitle = "Amniyotik Sıvı Desteği",
            iconName = "water",
            promptText = "Yanına bir bardak ılık su ve bir dilim limon bırak."
        ),
        EmpathyActionCard(
            id = "c3",
            title = "Güneş'e Seslenme",
            subtitle = "Baba Ses Frekansı Bağlanması",
            iconName = "voice",
            promptText = "Karnına doğru alçak frekanslı sakin bir tonda gününün nasıl geçtiğini anlat."
        )
    )
)

class PartnerViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(PartnerUiState())
    val uiState: StateFlow<PartnerUiState> = _uiState.asStateFlow()

    fun completeAction(cardId: String) {
        _uiState.update { state ->
            val updated = state.empathyCards.map {
                if (it.id == cardId) it.copy(isCompleted = !it.isCompleted) else it
            }
            state.copy(empathyCards = updated)
        }
    }
}
