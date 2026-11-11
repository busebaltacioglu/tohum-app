package org.tohum.mobile.core.model

import kotlinx.serialization.Serializable

@Serializable
data class MaternalProfile(
    val id: String = "buse_founder",
    val fullName: String = "Buse Nur Baltacıoğlu",
    val shortName: String = "Buse",
    val age: Int = 30,
    val parity: String = "G1P0 (Primigravida)",
    val lmpDate: String = "2026-01-17",
    val calculatedDueDate: String = "2026-10-24",
    val currentWeek: Int = 31,
    val babyName: String = "Güneş",
    val doctorName: String = "Dr. Ayşe Yılmaz",
    val hospitalName: String = "Manisa Şehir Hastanesi",
    val baselineVitals: BaselineVitals = BaselineVitals(
        systolic = 90,
        diastolic = 60,
        restingHeartRate = 72,
        baselineCategory = "low"
    ),
    val partner: PartnerInfo = PartnerInfo(
        fullName = "Oğuz Baltacıoğlu",
        shortName = "Oğuz",
        phone = "+90 532 000 00 00",
        inviteCode = "THM-31G-834",
        status = "connected"
    )
)

@Serializable
data class BaselineVitals(
    val systolic: Int = 90,
    val diastolic: Int = 60,
    val restingHeartRate: Int = 72,
    val baselineCategory: String = "low"
) {
    val displayString: String get() = "$systolic/$diastolic mmHg"
}

@Serializable
data class PartnerInfo(
    val fullName: String,
    val shortName: String,
    val phone: String,
    val inviteCode: String,
    val status: String
)
