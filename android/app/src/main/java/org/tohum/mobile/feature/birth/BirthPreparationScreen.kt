package org.tohum.mobile.feature.birth

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
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Stop
import androidx.compose.material.icons.filled.Work
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
import androidx.compose.ui.unit.dp
import org.tohum.mobile.core.designsystem.PillShape
import org.tohum.mobile.core.designsystem.TohumColors
import org.tohum.mobile.core.designsystem.TohumTypography

@Composable
fun BirthPreparationScreen(
    viewModel: BirthViewModel,
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
                        text = "Doğum & Dalga Takibi",
                        style = TohumTypography.headlineMedium,
                        color = TohumColors.TextPrimary
                    )
                    Text(
                        text = "Cardiff 10/2h & 5-1-1 Dalga Sayacı",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberSubtle
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(14.dp)) }

        // Cardiff Fetal Kick Counter Card
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
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "CARDIFF TEKME PROTOKOLÜ",
                            style = TohumTypography.labelSmall,
                            color = TohumColors.AmberPrimary
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "${state.cardiffKicksToday} / 10 Hareket Sayıldı",
                            style = TohumTypography.titleLarge,
                            color = TohumColors.TextPrimary
                        )
                        Text(
                            text = if (state.isCardiffComplete) "✓ Güneş'in fetal iyilik hali güvence altında." else "Saymaya devam edin.",
                            style = TohumTypography.bodyMedium,
                            color = TohumColors.SafeEmerald
                        )
                    }

                    Button(
                        onClick = { viewModel.addKick() },
                        shape = PillShape,
                        colors = ButtonDefaults.buttonColors(
                            containerColor = TohumColors.MaternalRose,
                            contentColor = TohumColors.UterineDark
                        )
                    ) {
                        Icon(
                            imageVector = Icons.Default.Favorite,
                            contentDescription = null,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(4.dp))
                        Text(text = "+ Tekme", style = TohumTypography.labelLarge)
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // 5-1-1 Contraction Wave Timer Card
        item {
            val minutes = state.currentWaveSeconds / 60
            val seconds = state.currentWaveSeconds % 60
            val formattedTime = String.format("%02d:%02d", minutes, seconds)

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(24.dp))
                    .background(
                        if (state.isTimingWave) TohumColors.MaternalRoseContainer else TohumColors.SurfaceDark
                    )
                    .border(
                        1.dp,
                        if (state.isTimingWave) TohumColors.MaternalRose else TohumColors.SurfaceBorder,
                        RoundedCornerShape(24.dp)
                    )
                    .padding(20.dp)
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "KASILMA / DALGA SAYACI (5-1-1)",
                        style = TohumTypography.labelSmall,
                        color = TohumColors.AmberPrimary
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = formattedTime,
                        style = TohumTypography.displayMedium,
                        color = if (state.isTimingWave) TohumColors.MaternalRose else TohumColors.TextPrimary
                    )

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = if (state.isTimingWave) "Dalga sürüyor... Derin nefes alın ve bedeninizi gevşetin." else "Dalga başladığında dokunun.",
                        style = TohumTypography.bodyMedium,
                        color = TohumColors.TextSecondary
                    )

                    Spacer(modifier = Modifier.height(14.dp))

                    Button(
                        onClick = { viewModel.toggleContractionWave() },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(50.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (state.isTimingWave) TohumColors.MaternalRose else TohumColors.AmberPrimary,
                            contentColor = TohumColors.UterineDark
                        )
                    ) {
                        Icon(
                            imageVector = if (state.isTimingWave) Icons.Default.Stop else Icons.Default.PlayArrow,
                            contentDescription = null,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (state.isTimingWave) "Dalga Bitti (Durdur)" else "Dalga Başladı",
                            style = TohumTypography.labelLarge,
                            color = TohumColors.UterineDark
                        )
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Hospital Bag Progress Card
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
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Work,
                            contentDescription = null,
                            tint = TohumColors.AmberSubtle,
                            modifier = Modifier.size(20.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "Doğum Çantası & Evraklar",
                                style = TohumTypography.titleMedium,
                                color = TohumColors.TextPrimary
                            )
                            Text(
                                text = "Anne, Bebek ve Resmi Evraklar",
                                style = TohumTypography.labelSmall,
                                color = TohumColors.TextMuted
                            )
                        }
                    }

                    Text(
                        text = "${state.hospitalBagItemsPacked} / ${state.hospitalBagItemsTotal} Hazır",
                        style = TohumTypography.labelLarge,
                        color = TohumColors.SafeEmerald
                    )
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }

        // Contraction History Title
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "SON DALGALAR (RİTİM DÜZENİ)",
                    style = TohumTypography.labelSmall,
                    color = TohumColors.TextMuted
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
        }

        // History items
        items(state.waveHistory) { wave ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(14.dp))
                    .background(TohumColors.UterineVelvet)
                    .padding(horizontal = 14.dp, vertical = 10.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Saat: ${wave.timestampFormatted}",
                    style = TohumTypography.titleMedium,
                    color = TohumColors.TextPrimary
                )
                Text(
                    text = "${wave.durationSeconds} sn · ${wave.intervalMinutes} dk arayla",
                    style = TohumTypography.labelLarge,
                    color = TohumColors.AmberSubtle
                )
            }
            Spacer(modifier = Modifier.height(6.dp))
        }

        item { Spacer(modifier = Modifier.height(32.dp)) }
    }
}
