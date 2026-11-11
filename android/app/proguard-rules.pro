# ToHUM Android Mobile Companion App ProGuard Rules
-keepattributes *Annotation*
-keepclassmembers class * {
    @androidx.health.connect.client.** *;
}
-keep class org.tohum.mobile.core.model.** { *; }
-keep class kotlinx.serialization.** { *; }
