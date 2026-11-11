package org.tohum.mobile.core.designsystem.motion

import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import org.tohum.mobile.core.designsystem.TohumColors

/**
 * Maternal Ambient Breathing Spec:
 * 5.5s infinite cycle (2.5s gentle expansion, 3.0s relaxed contraction)
 * Corresponding to ~0.1 Hz vagal resonant frequency for autonomic nervous coherence.
 */
@Composable
fun MaternalBreathingOrb(
    modifier: Modifier = Modifier,
    baseSize: Dp = 180.dp,
    coreColor: Color = TohumColors.AmberPrimary,
    glowColor: Color = TohumColors.MaternalRose,
    enabled: Boolean = true
) {
    val transition = rememberInfiniteTransition(label = "maternal_breath_transition")

    val scale by transition.animateFloat(
        initialValue = 0.94f,
        targetValue = 1.06f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 2750, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "breath_scale"
    )

    val glowAlpha by transition.animateFloat(
        initialValue = 0.25f,
        targetValue = 0.65f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 2750, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "glow_alpha"
    )

    val actualScale = if (enabled) scale else 1.0f
    val actualAlpha = if (enabled) glowAlpha else 0.35f

    Box(
        modifier = modifier.size(baseSize),
        contentAlignment = Alignment.Center
    ) {
        // Outer diffuse amniotic aura
        Box(
            modifier = Modifier
                .size(baseSize)
                .scale(actualScale * 1.25f)
                .background(
                    brush = Brush.radialGradient(
                        colors = listOf(
                            glowColor.copy(alpha = actualAlpha * 0.4f),
                            coreColor.copy(alpha = actualAlpha * 0.15f),
                            Color.Transparent
                        )
                    ),
                    shape = CircleShape
                )
        )

        // Mid gestational warmth layer
        Box(
            modifier = Modifier
                .size(baseSize * 0.75f)
                .scale(actualScale)
                .background(
                    brush = Brush.radialGradient(
                        colors = listOf(
                            coreColor.copy(alpha = actualAlpha * 0.85f),
                            coreColor.copy(alpha = actualAlpha * 0.3f),
                            Color.Transparent
                        )
                    ),
                    shape = CircleShape
                )
        )

        // Inner core seed
        Box(
            modifier = Modifier
                .size(baseSize * 0.35f)
                .background(
                    brush = Brush.radialGradient(
                        colors = listOf(
                            Color.White.copy(alpha = 0.85f),
                            coreColor.copy(alpha = 0.95f)
                        )
                    ),
                    shape = CircleShape
                )
        )
    }
}
