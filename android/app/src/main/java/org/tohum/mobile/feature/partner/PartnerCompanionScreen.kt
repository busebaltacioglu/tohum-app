package org.tohum.mobile.feature.partner

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Spa
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import org.tohum.mobile.core.designsystem.PillShape
import org.tohum.mobile.core.designsystem.TohumColors
import org.tohum.mobile.core.designsystem.TohumTypography
import org.tohum.mobile.core.model.PartnerLiveFeedItem

@Composable
fun PartnerCompanionScreen(
    viewModel: PartnerViewModel,
    onNavigateBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    val state by viewModel.uiState.collectAsState()

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(TohumColors.UterineDark)
            .padding(horizontal = 20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Top Navigation
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(
                    onClick = onNavigateBack,
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(TohumColors.SurfaceDark)
                ) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Geri",
                        tint = TohumColors.TextPrimary,
                        modifier = Modifier.size(18.dp)
                    )
                }

                Spacer(modifier = Modifier.width(12.dp))

                Column {
                    Text(
                        text = "Baba & Partner Eşlik Alanı",
                        style = TohumTypography.headlineMedium,
                        color = TohumColors.TextPrimary
                    )
                    Text(
                        text = "${state.partner.fullName} · 2 Oturumlu Aile Hesabı",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberSubtle
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(14.dp)) }

        // Partner Connected Status Card
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(TohumColors.SurfaceDark)
                    .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(20.dp))
                    .padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text(
                            text = "EŞ BAĞLANTISI",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.AmberPrimary
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = "${state.motherName} ile Senkronize",
                            style = TohumTypography.titleMedium,
                            color = TohumColors.TextPrimary
                        )
                    }

                    Box(
                        modifier = Modifier
                            .clip(PillShape)
                            .background(TohumColors.SafeEmeraldContainer)
                            .padding(horizontal = 10.dp, vertical = 5.dp)
                    ) {
                        Text(
                            text = "Canlı Akış Aktif ✓",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.SafeEmerald
                        )
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Section Title: Empathy Action Cards
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "GÜNLÜK ŞEFKAT & EŞLİK GÖREVLERİ",
                    style = TohumTypography.labelSmall,
                    color = TohumColors.AmberPrimary
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
        }

        // Empathy Action Cards
        items(state.empathyCards) { card ->
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(18.dp))
                    .background(TohumColors.SurfaceDark)
                    .border(
                        1.dp,
                        if (card.isCompleted) TohumColors.SafeEmerald.copy(alpha = 0.5f) else TohumColors.SurfaceBorder,
                        RoundedCornerShape(18.dp)
                    )
                    .clickable { viewModel.completeAction(card.id) }
                    .padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(
                                if (card.isCompleted) TohumColors.SafeEmeraldContainer else TohumColors.MaternalRoseContainer
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = if (card.isCompleted) Icons.Default.Check else Icons.Default.Spa,
                            contentDescription = null,
                            tint = if (card.isCompleted) TohumColors.SafeEmerald else TohumColors.MaternalRose,
                            modifier = Modifier.size(20.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(14.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = card.title,
                            style = TohumTypography.titleMedium,
                            color = TohumColors.TextPrimary
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = card.promptText,
                            style = TohumTypography.bodyMedium,
                            color = TohumColors.TextSecondary
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
        }

        item { Spacer(modifier = Modifier.height(14.dp)) }

        // Section Title: Maternal Live Feed
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "BUSE VE GÜNEŞ'TEN CANLI AKIŞ",
                    style = TohumTypography.labelSmall,
                    color = TohumColors.TextMuted
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
        }

        // Live Feed items
        items(state.liveFeed) { item ->
            LiveFeedItemCard(item = item)
            Spacer(modifier = Modifier.height(8.dp))
        }

        item { Spacer(modifier = Modifier.height(32.dp)) }
    }
}

@Composable
private fun LiveFeedItemCard(item: PartnerLiveFeedItem) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(18.dp))
            .background(TohumColors.UterineVelvet)
            .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(18.dp))
            .padding(14.dp)
    ) {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = item.title,
                    style = TohumTypography.titleMedium,
                    color = TohumColors.TextPrimary
                )
                Text(
                    text = item.timestamp,
                    style = TohumTypography.labelSmall,
                    color = TohumColors.TextMuted
                )
            }

            Spacer(modifier = Modifier.height(6.dp))

            Text(
                text = item.message,
                style = TohumTypography.bodyMedium,
                color = TohumColors.TextSecondary
            )

            item.actionSuggestion?.let { suggestion ->
                Spacer(modifier = Modifier.height(8.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(TohumColors.SurfaceDark)
                        .padding(horizontal = 10.dp, vertical = 6.dp)
                ) {
                    Text(
                        text = "💬 İpucu: $suggestion",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberSubtle
                    )
                }
            }
        }
    }
}
