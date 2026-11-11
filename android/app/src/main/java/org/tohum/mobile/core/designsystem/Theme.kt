package org.tohum.mobile.core.designsystem

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val TohumDarkColorScheme = darkColorScheme(
    primary = TohumColors.AmberPrimary,
    onPrimary = TohumColors.UterineDark,
    primaryContainer = TohumColors.AmberContainer,
    onPrimaryContainer = TohumColors.AmberSubtle,

    secondary = TohumColors.MaternalRose,
    onSecondary = TohumColors.UterineDark,
    secondaryContainer = TohumColors.MaternalRoseContainer,
    onSecondaryContainer = TohumColors.MaternalRoseSubtle,

    tertiary = TohumColors.AmnioticCyan,
    onTertiary = TohumColors.UterineDark,
    tertiaryContainer = TohumColors.AmnioticContainer,
    onTertiaryContainer = TohumColors.AmnioticCyanSubtle,

    background = TohumColors.UterineDark,
    onBackground = TohumColors.TextPrimary,

    surface = TohumColors.UterineVelvet,
    onSurface = TohumColors.TextPrimary,
    surfaceVariant = TohumColors.SurfaceDark,
    onSurfaceVariant = TohumColors.TextSecondary,

    outline = TohumColors.SurfaceBorder,
    outlineVariant = TohumColors.SurfaceBorderLight
)

data class TohumThemeState(
    val isNightMode: Boolean = false,
    val isBreathingActive: Boolean = true,
    val audioResonanceHz: Double = 8.3
)

val LocalTohumThemeState = staticCompositionLocalOf { TohumThemeState() }

@Composable
fun TohumTheme(
    nightMode: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = TohumDarkColorScheme
    val view = LocalView.current

    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as? Activity)?.window ?: return@SideEffect
            window.statusBarColor = TohumColors.UterineDark.toArgb()
            window.navigationBarColor = TohumColors.UterineDark.toArgb()
            WindowCompat.getInsetsController(window, view).apply {
                isAppearanceLightStatusBars = false
                isAppearanceLightNavigationBars = false
            }
        }
    }

    CompositionLocalProvider(
        LocalTohumThemeState provides TohumThemeState(isNightMode = nightMode)
    ) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = TohumTypography,
            shapes = TohumShapes,
            content = content
        )
    }
}
