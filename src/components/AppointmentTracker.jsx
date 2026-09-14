import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../constants/theme';

export const AppointmentTracker = ({ appointments, onAddAppointment }) => {
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [hospital, setHospital] = useState('');

  const handleAdd = () => {
    if (!doctorName || !date) return;
    onAddAppointment({
      id: Date.now().toString(),
      doctorName,
      date,
      hospital: hospital || 'Merkez Hastanesi',
      questions: [
        'Gece kramplarım için magnezyum dozu yeterli mi?',
        'Bebeğin baş aşağı dönüşü tamamlandı mı?',
        'Doğum çantam için hastanenizin özel bir kuralı var mı?'
      ],
      doctorNotes: ''
    });
    setDoctorName('');
    setDate('');
    setHospital('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🗓️ Doktor Randevuları & Akıllı Hazırlık</Text>
      
      <View style={styles.inputBox}>
        <TextInput 
          placeholder="Doktor Adı (Örn: Dr. Ayşe Yılmaz)" 
          value={doctorName} 
          onChangeText={setDoctorName}
          style={styles.input} 
        />
        <TextInput 
          placeholder="Tarih (Örn: 18 Eylül 14:00)" 
          value={date} 
          onChangeText={setDate}
          style={styles.input} 
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.btnText}>+ Randevu Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.docTitle}>🩺 {item.doctorName} • {item.date}</Text>
            <Text style={styles.hospitalText}>🏥 {item.hospital}</Text>
            
            <View style={styles.qBox}>
              <Text style={styles.qTitle}>📋 Doktoruna Sorman Önerilen Sorular:</Text>
              {item.questions.map((q, idx) => (
                <Text key={idx} style={styles.qText}>• {q}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: COLORS.warmCream, borderRadius: 16 },
  heading: { fontSize: 18, fontFamily: 'serif', color: COLORS.deepSlate, marginBottom: 12, fontWeight: 'bold' },
  inputBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 12, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', padding: 10, borderRadius: 8, marginBottom: 8 },
  addBtn: { backgroundColor: COLORS.sproutGreen, padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  card: { backgroundColor: '#FFF', padding: 14, borderRadius: 12, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: COLORS.honeyGold },
  docTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.deepSlate },
  hospitalText: { fontSize: 13, color: COLORS.slateMuted, marginBottom: 8 },
  qBox: { backgroundColor: COLORS.warmCream, padding: 10, borderRadius: 8 },
  qTitle: { fontSize: 13, fontWeight: 'bold', color: COLORS.deepSlate, marginBottom: 4 },
  qText: { fontSize: 12, color: COLORS.deepSlate, marginBottom: 2 }
});