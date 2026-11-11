package org.tohum.mobile.feature.home

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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Opacity
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.tohum.mobile.core.designsystem.PillShape
import org.tohum.mobile.core.designsystem.TohumColors
import org.tohum.mobile.core.designsystem.TohumTypography
import org.tohum.mobile.core.designsystem.motion.MaternalBreathingOrb

@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onNavigateToDmt1: () -> Unit,
    onNavigateToHealth: () -> Unit,
    onNavigateToPartner: () -> Unit,
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
        // Top Space for Status Bar Inset
        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Minimalist Top Bar: Week Pill & 8.3 Hz Binaural Resonance
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Week Indicator Pill
                Box(
                    modifier = Modifier
                        .clip(PillShape)
                        .background(TohumColors.SurfaceDark)
                        .border(1.dp, TohumColors.SurfaceBorder, PillShape)
                        .padding(horizontal = 14.dp, vertical = 8.dp)
                ) {
                    Text(
                        text = "${state.profile.babyName} · ${state.profile.currentWeek}. Hafta",
                        style = TohumTypography.labelLarge,
                        color = TohumColors.AmberSubtle
                    )
                }

                // 8.3 Hz Resonance Button
                Row(
                    modifier = Modifier
                        .clip(PillShape)
                        .background(
                            if (state.isAudioResonancePlaying) TohumColors.AmberContainer else TohumColors.SurfaceDark
                        )
                        .border(
                            1.dp,
                            if (state.isAudioResonancePlaying) TohumColors.AmberPrimary else TohumColors.SurfaceBorder,
                            PillShape
                        )
                        .clickable { viewModel.toggleAudioResonance() }
                        .padding(horizontal = 12.dp, vertical = 7.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(7.dp)
                            .background(
                                if (state.isAudioResonancePlaying) TohumColors.SafeEmerald else TohumColors.AmberPrimary,
                                CircleShape
                            )
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "8.3 Hz",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.TextSecondary
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(20.dp)) }

        // Center: Maternal Ambient Womb Experience (Breathing Orb)
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(260.dp)
                    .clickable { viewModel.registerKick() },
                contentAlignment = Alignment.Center
            ) {
                MaternalBreathingOrb(
                    baseSize = 200.dp,
                    enabled = true
                )

                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Güneş",
                        style = TohumTypography.displaySmall,
                        color = Color.White
                    )
                    Text(
                        text = "1.75 kg · 42 cm",
                        style = TohumTypography.bodyMedium,
                        color = TohumColors.AmberSubtle
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Box(
                        modifier = Modifier
                            .clip(PillShape)
                            .background(TohumColors.SurfaceDark.copy(alpha = 0.8f))
                            .padding(horizontal = 10.dp, vertical = 4.dp)
                    ) {
                        Text(
                            text = "142 bpm · Huzurlu",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.SafeEmerald
                        )
                    }
                }
            }
        }

        // Whispering Supportive Insight (Calm Tech)
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
                    Text(
                        text = "GÜNLÜK FISILTI",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberPrimary
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = state.statusWhisper,
                        style = TohumTypography.bodyMedium,
                        color = TohumColors.TextSecondary
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Hydration & Kick Quick Stats
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Hydration Card
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(20.dp))
                        .background(TohumColors.SurfaceDark)
                        .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(20.dp))
                        .clickable { viewModel.incrementWater() }
                        .padding(14.dp)
                ) {
                    Column {
                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Opacity,
                                contentDescription = null,
                                tint = TohumColors.AmnioticCyan,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "Amniyotik Su",
                                style = TohumTypography.labelSmall,
                                color = TohumColors.TextMuted
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "${state.hydration.currentGlasses} / ${state.hydration.targetGlasses} Bardak",
                            style = TohumTypography.titleMedium,
                            color = TohumColors.TextPrimary
                        )
                        Text(
                            text = "+ Dokun ve Ekle",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.AmnioticCyan
                        )
                    }
                }

                // Fetal Cardiff Kick Count Card
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(20.dp))
                        .background(TohumColors.SurfaceDark)
                        .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(20.dp))
                        .clickable { viewModel.registerKick() }
                        .padding(14.dp)
                ) {
                    Column {
                        Row(
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                imageVector = Icons.Default.Favorite,
                                contentDescription = null,
                                tint = TohumColors.MaternalRose,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = "Tekme Sayımı",
                                style = TohumTypography.labelSmall,
                                color = TohumColors.TextMuted
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "${state.kickCountToday} Hareket",
                            style = TohumTypography.titleMedium,
                            color = TohumColors.TextPrimary
                        )
                        Text(
                            text = "Cardiff 10/2h Tamamlandı",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.SafeEmerald
                        )
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // DMT-1 Chronopharmacology Supplement Dock
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(24.dp))
                    .background(TohumColors.SurfaceDark)
                    .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(24.dp))
                    .padding(16.dp)
            ) {
                Column {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "DMT-1 BİYO-RİTİM TAKVİMİ",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.AmberPrimary
                        )
                        Text(
                            text = "Detay ➔",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.AmberSubtle,
                            modifier = Modifier.clickable { onNavigateToDmt1() }
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    state.supplements.forEach { item ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(14.dp))
                                .background(TohumColors.UterineVelvet)
                                .clickable { viewModel.toggleSupplementTaken(item.id) }
                                .padding(horizontal = 12.dp, vertical = 10.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = item.commercialName,
                                    style = TohumTypography.titleMedium,
                                    color = TohumColors.TextPrimary
                                )
                                Text(
                                    text = "${item.scheduledTime} · ${item.dosageInstruction}",
                                    style = TohumTypography.labelSmall,
                                    color = TohumColors.TextMuted
                                )
                            }

                            Box(
                                modifier = Modifier
                                    .size(28.dp)
                                    .clip(CircleShape)
                                    .background(
                                        if (item.takenToday) TohumColors.SafeEmerald else TohumColors.SurfaceDark
                                    )
                                    .border(
                                        1.dp,
                                        if (item.takenToday) TohumColors.SafeEmerald else TohumColors.SurfaceBorder,
                                        CircleShape
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                if (item.takenToday) {
                                    Icon(
                                        imageVector = Icons.Default.Check,
                                        contentDescription = null,
                                        tint = TohumColors.UterineDark,
                                        modifier = Modifier.size(16.dp)
                                    )
                                }
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(32.dp)) }
    }
}
