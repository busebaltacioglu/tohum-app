package org.tohum.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Medication
import androidx.compose.material.icons.filled.People
import androidx.compose.material.icons.filled.Watch
import androidx.compose.material.icons.filled.Waves
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import org.tohum.mobile.core.designsystem.TohumColors
import org.tohum.mobile.core.designsystem.TohumTheme
import org.tohum.mobile.core.designsystem.TohumTypography
import org.tohum.mobile.core.wearable.WearableRepository
import org.tohum.mobile.feature.birth.BirthPreparationScreen
import org.tohum.mobile.feature.birth.BirthViewModel
import org.tohum.mobile.feature.dmt1.Dmt1ScheduleScreen
import org.tohum.mobile.feature.dmt1.Dmt1ViewModel
import org.tohum.mobile.feature.health.HealthViewModel
import org.tohum.mobile.feature.health.MaternalHealthScreen
import org.tohum.mobile.feature.home.HomeScreen
import org.tohum.mobile.feature.home.HomeViewModel
import org.tohum.mobile.feature.partner.PartnerCompanionScreen
import org.tohum.mobile.feature.partner.PartnerViewModel
import org.tohum.mobile.feature.wearable.WearableDeviceHubScreen
import org.tohum.mobile.feature.wearable.WearableViewModel

sealed class Screen(val route: String, val title: String, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    object Home : Screen("home", "Güneş", Icons.Default.Home)
    object Dmt1 : Screen("dmt1", "DMT-1", Icons.Default.Medication)
    object Health : Screen("health", "Sağlık", Icons.Default.Favorite)
    object Birth : Screen("birth", "Doğum", Icons.Default.Waves)
    object Wearable : Screen("wearable", "Saat", Icons.Default.Watch)
    object Partner : Screen("partner", "Baba", Icons.Default.People)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TohumTheme {
                val navController = rememberNavController()
                val wearableRepository = remember { WearableRepository(applicationContext) }

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    containerColor = TohumColors.UterineDark,
                    bottomBar = {
                        TohumBottomNavBar(navController = navController)
                    }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = Screen.Home.route,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable(Screen.Home.route) {
                            val homeViewModel: HomeViewModel = viewModel()
                            HomeScreen(
                                viewModel = homeViewModel,
                                onNavigateToDmt1 = { navController.navigate(Screen.Dmt1.route) },
                                onNavigateToHealth = { navController.navigate(Screen.Health.route) },
                                onNavigateToPartner = { navController.navigate(Screen.Partner.route) }
                            )
                        }

                        composable(Screen.Dmt1.route) {
                            val dmt1ViewModel: Dmt1ViewModel = viewModel()
                            Dmt1ScheduleScreen(
                                viewModel = dmt1ViewModel,
                                onNavigateBack = { navController.popBackStack() }
                            )
                        }

                        composable(Screen.Health.route) {
                            val healthViewModel: HealthViewModel = viewModel {
                                HealthViewModel(wearableRepository)
                            }
                            MaternalHealthScreen(
                                viewModel = healthViewModel,
                                onNavigateBack = { navController.popBackStack() }
                            )
                        }

                        composable(Screen.Birth.route) {
                            val birthViewModel: BirthViewModel = viewModel()
                            BirthPreparationScreen(
                                viewModel = birthViewModel,
                                onNavigateBack = { navController.popBackStack() }
                            )
                        }

                        composable(Screen.Wearable.route) {
                            val wearableViewModel: WearableViewModel = viewModel {
                                WearableViewModel(wearableRepository)
                            }
                            WearableDeviceHubScreen(
                                viewModel = wearableViewModel,
                                onNavigateBack = { navController.popBackStack() }
                            )
                        }

                        composable(Screen.Partner.route) {
                            val partnerViewModel: PartnerViewModel = viewModel()
                            PartnerCompanionScreen(
                                viewModel = partnerViewModel,
                                onNavigateBack = { navController.popBackStack() }
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun TohumBottomNavBar(navController: NavHostController) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val items = listOf(
        Screen.Home,
        Screen.Dmt1,
        Screen.Health,
        Screen.Birth,
        Screen.Wearable,
        Screen.Partner
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .navigationBarsPadding()
            .padding(horizontal = 12.dp, vertical = 6.dp)
            .clip(RoundedCornerShape(24.dp))
            .background(TohumColors.SurfaceDark)
            .border(1.dp, TohumColors.SurfaceBorder, RoundedCornerShape(24.dp))
    ) {
        NavigationBar(
            containerColor = TohumColors.SurfaceDark,
            tonalElevation = 0.dp,
            modifier = Modifier.height(64.dp)
        ) {
            items.forEach { screen ->
                val isSelected = currentRoute == screen.route
                NavigationBarItem(
                    selected = isSelected,
                    onClick = {
                        if (currentRoute != screen.route) {
                            navController.navigate(screen.route) {
                                popUpTo(Screen.Home.route) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    },
                    icon = {
                        Icon(
                            imageVector = screen.icon,
                            contentDescription = screen.title,
                            modifier = Modifier.size(20.dp)
                        )
                    },
                    label = {
                        Text(
                            text = screen.title,
                            style = TohumTypography.labelSmall
                        )
                    },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = TohumColors.AmberPrimary,
                        selectedTextColor = TohumColors.AmberSubtle,
                        unselectedIconColor = TohumColors.TextMuted,
                        unselectedTextColor = TohumColors.TextMuted,
                        indicatorColor = TohumColors.AmberContainer
                    )
                )
            }
        }
    }
}
