package org.tohum.mobile.feature.wearable

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Bedtime
import androidx.compose.material.icons.filled.DirectionsWalk
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Watch
import androidx.compose.material.icons.filled.Waves
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import org.tohum.mobile.core.designsystem.PillShape
import org.tohum.mobile.core.designsystem.TohumColors
import org.tohum.mobile.core.designsystem.TohumTypography

@Composable
fun WearableDeviceHubScreen(
    viewModel: WearableViewModel,
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
                        text = "Akıllı Saat & Biyo-Sensör Köprüsü",
                        style = TohumTypography.headlineMedium,
                        color = TohumColors.TextPrimary
                    )
                    Text(
                        text = "Android Health Connect & BLE Entegrasyonu",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberSubtle
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(14.dp)) }

        // Connected Device Card
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(22.dp))
                    .background(TohumColors.SurfaceDark)
                    .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(22.dp))
                    .padding(18.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(46.dp)
                                .clip(CircleShape)
                                .background(TohumColors.AmberContainer),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Watch,
                                contentDescription = null,
                                tint = TohumColors.AmberPrimary,
                                modifier = Modifier.size(24.dp)
                            )
                        }

                        Spacer(modifier = Modifier.width(14.dp))

                        Column {
                            Text(
                                text = state.device.name,
                                style = TohumTypography.titleMedium,
                                color = TohumColors.TextPrimary
                            )
                            Text(
                                text = "Pil: %${state.device.batteryPct} · ${state.device.lastSyncFormatted}",
                                style = TohumTypography.labelSmall,
                                color = TohumColors.TextMuted
                            )
                        }
                    }

                    Box(
                        modifier = Modifier
                            .clip(PillShape)
                            .background(TohumColors.SafeEmeraldContainer)
                            .padding(horizontal = 10.dp, vertical = 5.dp)
                    ) {
                        Text(
                            text = "Bağlı ✓",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.SafeEmerald
                        )
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Live Biometrics Grid (2x2)
        item {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    BiometricMetricCard(
                        icon = Icons.Default.Favorite,
                        title = "Anlık Nabız",
                        value = "${state.biometrics.liveHeartRateBpm} bpm",
                        subtitle = "Dinlenik: ${state.biometrics.restingHeartRateBpm} bpm",
                        tint = TohumColors.MaternalRose,
                        modifier = Modifier.weight(1f)
                    )

                    BiometricMetricCard(
                        icon = Icons.Default.Waves,
                        title = "Otonom HRV",
                        value = "${state.biometrics.autonomicHrvMs} ms",
                        subtitle = "Vagal Tonus Dengeli",
                        tint = TohumColors.AmberPrimary,
                        modifier = Modifier.weight(1f)
                    )
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    BiometricMetricCard(
                        icon = Icons.Default.Bedtime,
                        title = "Gece Uykusu",
                        value = state.biometrics.sleepDurationFormatted,
                        subtitle = "Derin Uyku: ${state.biometrics.deepSleepMinutes} dk",
                        tint = TohumColors.MagnesiumViolet,
                        modifier = Modifier.weight(1f)
                    )

                    BiometricMetricCard(
                        icon = Icons.Default.DirectionsWalk,
                        title = "Günlük Adım",
                        value = "${state.biometrics.dailySteps}",
                        subtitle = "Hafif Anne Yürüyüşü",
                        tint = TohumColors.SafeEmerald,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(20.dp)) }

        // Sync Action Button
        item {
            Button(
                onClick = { viewModel.syncNow() },
                enabled = !state.isSyncing,
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
                    imageVector = Icons.Default.Refresh,
                    contentDescription = null,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = if (state.isSyncing) "Biyo-Sensör Senkronize Ediliyor..." else "Şimdi Senkronize Et",
                    style = TohumTypography.labelLarge,
                    color = TohumColors.UterineDark
                )
            }
        }

        item { Spacer(modifier = Modifier.height(32.dp)) }
    }
}

@Composable
private fun BiometricMetricCard(
    icon: ImageVector,
    title: String,
    value: String,
    subtitle: String,
    tint: androidx.compose.ui.graphics.Color,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(20.dp))
            .background(TohumColors.SurfaceDark)
            .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(20.dp))
            .padding(14.dp)
    ) {
        Column {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = tint,
                    modifier = Modifier.size(16.dp)
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = title,
                    style = TohumTypography.labelSmall,
                    color = TohumColors.TextMuted
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = value,
                style = TohumTypography.titleLarge,
                color = TohumColors.TextPrimary
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = subtitle,
                style = TohumTypography.labelSmall,
                color = TohumColors.AmberSubtle
            )
        }
    }
}
