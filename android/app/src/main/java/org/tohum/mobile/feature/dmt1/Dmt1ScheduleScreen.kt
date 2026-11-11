package org.tohum.mobile.feature.dmt1

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
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.CloudSync
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import org.tohum.mobile.core.designsystem.PillShape
import org.tohum.mobile.core.designsystem.TohumColors
import org.tohum.mobile.core.designsystem.TohumTypography
import org.tohum.mobile.core.model.Dmt1SupplementItem
import org.tohum.mobile.core.model.NutrientClass

@Composable
fun Dmt1ScheduleScreen(
    viewModel: Dmt1ViewModel,
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

        // Top Navigation & Title
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
                        text = "DMT-1 Biyo-Ritim Takvimi",
                        style = TohumTypography.headlineMedium,
                        color = TohumColors.TextPrimary
                    )
                    Text(
                        text = "Klinik Çift Değerlikli Katyon Koruyucu",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberSubtle
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(12.dp)) }

        // Safety Status Banner
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(
                        if (state.schedule.isDmt1Safe) TohumColors.SafeEmeraldContainer else TohumColors.MaternalRoseContainer
                    )
                    .border(
                        1.dp,
                        if (state.schedule.isDmt1Safe) TohumColors.SafeEmerald else TohumColors.MaternalRose,
                        RoundedCornerShape(20.dp)
                    )
                    .padding(16.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = if (state.schedule.isDmt1Safe) Icons.Default.CheckCircle else Icons.Default.Warning,
                        contentDescription = null,
                        tint = if (state.schedule.isDmt1Safe) TohumColors.SafeEmerald else TohumColors.MaternalRose,
                        modifier = Modifier.size(24.dp)
                    )
                    Spacer(modifier = Modifier.width(12.dp))
                    Column {
                        Text(
                            text = if (state.schedule.isDmt1Safe) "Farmakolojik Uyumluluk Tam" else "DMT-1 Çakışma Uyarısı",
                            style = TohumTypography.titleMedium,
                            color = TohumColors.TextPrimary
                        )
                        Text(
                            text = state.schedule.recommendationSummary,
                            style = TohumTypography.bodyMedium,
                            color = TohumColors.TextSecondary
                        )
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Timeline Items
        items(state.schedule.supplements) { supplement ->
            SupplementTimelineCard(supplement = supplement)
            Spacer(modifier = Modifier.height(10.dp))
        }

        // e-Reçete Sync Action
        item {
            Spacer(modifier = Modifier.height(12.dp))
            Button(
                onClick = { viewModel.syncWithBackend() },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = TohumColors.AmberPrimary,
                    contentColor = TohumColors.UterineDark
                )
            ) {
                Icon(
                    imageVector = Icons.Default.CloudSync,
                    contentDescription = null,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = state.syncStatusText,
                    style = TohumTypography.labelLarge,
                    color = TohumColors.UterineDark
                )
            }
        }

        item { Spacer(modifier = Modifier.height(32.dp)) }
    }
}

@Composable
private fun SupplementTimelineCard(supplement: Dmt1SupplementItem) {
    val mineralAccent = when (supplement.nutrientClass) {
        NutrientClass.DIVALENT_IRON -> TohumColors.IronOrange
        NutrientClass.DIVALENT_MAGNESIUM -> TohumColors.MagnesiumViolet
        NutrientClass.DIVALENT_CALCIUM -> TohumColors.AmnioticCyan
        NutrientClass.PEPTIDE_COLLAGEN -> TohumColors.CollagenCoral
        NutrientClass.LIPID_OMEGA3, NutrientClass.LIPID_VITAMIN_D3 -> TohumColors.OmegaGold
        else -> TohumColors.AmberPrimary
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(20.dp))
            .background(TohumColors.SurfaceDark)
            .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(20.dp))
            .padding(16.dp)
    ) {
        Row(verticalAlignment = Alignment.Top) {
            // Time Capsule
            Box(
                modifier = Modifier
                    .clip(PillShape)
                    .background(mineralAccent.copy(alpha = 0.2f))
                    .border(1.dp, mineralAccent.copy(alpha = 0.5f), PillShape)
                    .padding(horizontal = 10.dp, vertical = 6.dp)
            ) {
                Text(
                    text = supplement.scheduledTime,
                    style = TohumTypography.labelLarge,
                    color = mineralAccent
                )
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = supplement.commercialName,
                    style = TohumTypography.titleMedium,
                    color = TohumColors.TextPrimary
                )
                Text(
                    text = supplement.genericName,
                    style = TohumTypography.labelSmall,
                    color = TohumColors.TextMuted
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Doz: ${supplement.dosageInstruction}",
                    style = TohumTypography.bodyMedium,
                    color = TohumColors.AmberSubtle
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "💡 ${supplement.absorptionSynergyTip}",
                    style = TohumTypography.bodyMedium,
                    color = TohumColors.TextSecondary
                )
            }
        }
    }
}
