package org.tohum.mobile.core.network

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.get
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.ContentType
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject

@Serializable
data class ParsePrescriptionRequest(
    val pdfBase64: String? = null,
    val rawText: String? = null,
    val ePrescriptionCode: String? = null
)

@Serializable
data class IntegratePrescriptionRequest(
    val userId: String = "buse_founder",
    val items: List<String> = emptyList(),
    val hasCollagen: Boolean = true
)

@Serializable
data class ApiResponse(
    val status: String,
    val message: String? = null
)

class TohumApiClient(
    private val baseUrl: String = "http://10.0.2.2:8080" // Standard Android Emulator loopback to host localhost:8080
) {
    private val client = HttpClient {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
                prettyPrint = false
            })
        }
    }

    suspend fun getHealthStatus(): Boolean {
        return try {
            val response = client.get("$baseUrl/api/profile/data")
            response.status.value in 200..299
        } catch (e: Exception) {
            false
        }
    }

    suspend fun parsePrescription(rawText: String?, ePrescriptionCode: String?): String {
        return try {
            val response = client.post("$baseUrl/api/prescription/parse") {
                contentType(ContentType.Application.Json)
                setBody(
                    ParsePrescriptionRequest(
                        rawText = rawText,
                        ePrescriptionCode = ePrescriptionCode
                    )
                )
            }
            response.body<String>()
        } catch (e: Exception) {
            "Fallback Local DMT1 Parser Active"
        }
    }

    suspend fun integratePrescription(items: List<String>, hasCollagen: Boolean): Boolean {
        return try {
            val response = client.post("$baseUrl/api/prescription/integrate") {
                contentType(ContentType.Application.Json)
                setBody(
                    IntegratePrescriptionRequest(
                        items = items,
                        hasCollagen = hasCollagen
                    )
                )
            }
            response.status.value in 200..299
        } catch (e: Exception) {
            false
        }
    }
}
