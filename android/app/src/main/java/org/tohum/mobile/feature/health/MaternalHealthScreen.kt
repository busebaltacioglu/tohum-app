package org.tohum.mobile.feature.health

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
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.MonitorWeight
import androidx.compose.material.icons.filled.Security
import androidx.compose.material3.FloatingActionButton
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
import org.tohum.mobile.core.model.BpEvaluationLevel

@Composable
fun MaternalHealthScreen(
    viewModel: HealthViewModel,
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
                        text = "Maternal Kardiyovasküler & Sağlık",
                        style = TohumTypography.headlineMedium,
                        color = TohumColors.TextPrimary
                    )
                    Text(
                        text = "Kişiye Özel Bazal Koridor Takibi",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberSubtle
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(14.dp)) }

        // Personalized Baseline Capsule Card
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
                            text = "KİŞİSEL GEBELİK BAZALİ",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.AmberPrimary
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = "${state.baseline.displayString} · Dinlenik ${state.baseline.restingHeartRate} bpm",
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
                            text = "Kalibre Edildi ✓",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.SafeEmerald
                        )
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(12.dp)) }

        // Real-time Evaluation Card
        item {
            val evalColor = when (state.bpEvaluation.level) {
                BpEvaluationLevel.OPTIMAL_CORRIDOR -> TohumColors.SafeEmerald
                BpEvaluationLevel.ACCEPTABLE_MODERATE -> TohumColors.AmberPrimary
                BpEvaluationLevel.ATYPICAL_ELEVATION -> TohumColors.IronOrange
                BpEvaluationLevel.CRITICAL_OBSERVATION -> TohumColors.MaternalRose
            }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(22.dp))
                    .background(TohumColors.SurfaceDark)
                    .border(1.dp, evalColor.copy(alpha = 0.5f), RoundedCornerShape(22.dp))
                    .padding(18.dp)
            ) {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.Favorite,
                                contentDescription = null,
                                tint = evalColor,
                                modifier = Modifier.size(20.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Son Tansiyon Ölçümü",
                                style = TohumTypography.titleMedium,
                                color = TohumColors.TextPrimary
                            )
                        }

                        Text(
                            text = "${state.latestBp.displayValue} mmHg",
                            style = TohumTypography.headlineMedium,
                            color = evalColor
                        )
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Text(
                        text = state.bpEvaluation.message,
                        style = TohumTypography.bodyMedium,
                        color = TohumColors.TextSecondary
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(14.dp)) }

        // IOM Weight Corridor Card
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(20.dp))
                    .background(TohumColors.SurfaceDark)
                    .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(20.dp))
                    .padding(16.dp)
            ) {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(
                                imageVector = Icons.Default.MonitorWeight,
                                contentDescription = null,
                                tint = TohumColors.AmberSubtle,
                                modifier = Modifier.size(18.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "IOM Gebelik Kilo Koridoru",
                                style = TohumTypography.titleMedium,
                                color = TohumColors.TextPrimary
                            )
                        }

                        Text(
                            text = "${state.weightRecord.currentWeightKg} kg",
                            style = TohumTypography.titleMedium,
                            color = TohumColors.AmberSubtle
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = "31. Hafta İdeal Aralık: ${state.weightRecord.minTargetWeightKg} - ${state.weightRecord.maxTargetWeightKg} kg (Toplam Artış: +7.0 kg ✓)",
                        style = TohumTypography.bodyMedium,
                        color = TohumColors.SafeEmerald
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // History Title
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "GEÇMİŞ ÖLÇÜMLER",
                    style = TohumTypography.labelSmall,
                    color = TohumColors.TextMuted
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
        }

        // History items
        items(state.history) { record ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(14.dp))
                    .background(TohumColors.UterineVelvet)
                    .padding(horizontal = 14.dp, vertical = 10.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "${record.displayValue} mmHg",
                        style = TohumTypography.titleMedium,
                        color = TohumColors.TextPrimary
                    )
                    Text(
                        text = record.note.ifEmpty { "Rutin Ölçüm" },
                        style = TohumTypography.labelSmall,
                        color = TohumColors.TextMuted
                    )
                }

                Text(
                    text = "${record.pulseBpm} bpm",
                    style = TohumTypography.labelLarge,
                    color = TohumColors.AmberSubtle
                )
            }
            Spacer(modifier = Modifier.height(6.dp))
        }

        item { Spacer(modifier = Modifier.height(32.dp)) }
    }
}
