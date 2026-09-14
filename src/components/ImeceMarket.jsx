import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../constants/theme';

export const ImeceMarket = () => {
  const [filter, setFilter] = useState('all');

  const items = [
    { id: '1', title: 'Organik Ahşap Anne Yanı Beşik', user: 'Zeynep A.', dist: '600m', type: 'gift', desc: '4 ay tertemiz kullanıldı, ücretsiz devrediyorum.' },
    { id: '2', title: 'GOTS 0-3 Ay Tulum Seti (5 Adet)', user: 'Elif S.', dist: '1.8km', type: 'trade', desc: 'Sembolik takas veya 150 TL.' },
    { id: '3', title: 'Ergonomik Kanguru (Doğal Keten)', user: 'Merve B.', dist: '1.2km', type: 'gift', desc: 'Hiç kullanılmadı, ihtiyacı olan anneye hediye.' }
  ];

  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 TOHUM İMECE: Döngüsel Eşya Paylaşımı</Text>
      <Text style={styles.subTitle}>"Bir bebeğin küçüleni, başka bir tohumun ilki olsun."</Text>

      <View style={styles.filterRow}>
        <TouchableOpacity style={[styles.filterBtn, filter === 'all' && styles.filterActive]} onPress={() => setFilter('all')}>
          <Text style={styles.filterText}>Tümü</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter === 'gift' && styles.filterActive]} onPress={() => setFilter('gift')}>
          <Text style={styles.filterText}>🎁 Hediye / İmece</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter === 'trade' && styles.filterActive]} onPress={() => setFilter('trade')}>
          <Text style={styles.filterText}>🔄 Sembolik Takas</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={[styles.badge, item.type === 'gift' ? styles.badgeGift : styles.badgeTrade]}>
                {item.type === 'gift' ? 'ÜCRETSİZ HEDİYE' : 'SEMBOLİK TAKAS'}
              </Text>
            </View>
            <Text style={styles.desc}>{item.desc}</Text>
            <View style={styles.footer}>
              <Text style={styles.userText}>👤 {item.user} • 📍 {item.dist}</Text>
              <TouchableOpacity style={styles.chatBtn}>
                <Text style={styles.chatBtnText}>💬 Mesaj At & Al</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: COLORS.warmCream },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.deepSlate, fontFamily: 'serif' },
  subTitle: { fontSize: 12, color: COLORS.slateMuted, fontStyle: 'italic', marginBottom: 12 },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#FFF', borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  filterActive: { backgroundColor: COLORS.sproutGreen, borderColor: COLORS.sproutGreen },
  filterText: { fontSize: 12, color: COLORS.deepSlate, fontWeight: '600' },
  card: { backgroundColor: '#FFF', padding: 14, borderRadius: 12, marginBottom: 10, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  itemTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.deepSlate, flex: 1 },
  badge: { fontSize: 10, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6, fontWeight: 'bold' },
  badgeGift: { backgroundColor: '#E8F5E9', color: '#2E7D32' },
  badgeTrade: { backgroundColor: '#FFF3E0', color: '#E65100' },
  desc: { fontSize: 13, color: COLORS.deepSlate, marginBottom: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userText: { fontSize: 12, color: COLORS.slateMuted },
  chatBtn: { backgroundColor: COLORS.honeyGold, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  chatBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 }
});