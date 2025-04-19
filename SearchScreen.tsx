import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Profile } from './types'; // Adjust path if needed

// === Placeholder for future backend call ===
const fetchProfiles = async (): Promise<Profile[]> => {
  return [
    { id: '1', name: 'Alice Johnson', tags: ['Freshman', 'Commuter'], color: '#F1D87C' },
    { id: '2', name: 'Bob Lee', tags: ['Sophomore'], color: '#D9884C' },
    { id: '3', name: 'Carla Smith', tags: ['Freshman'], color: '#D9735A' },
    { id: '4', name: 'Dan Kim', tags: ['Transfer', 'Commuter'], color: '#C96352' },
  ];
};

const SearchScreen = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProfiles();
      setProfiles(data);
      setFilteredProfiles(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = profiles;

    if (selectedTag) {
      result = result.filter(profile => profile.tags.includes(selectedTag));
    }

    if (searchText) {
      result = result.filter(profile =>
        profile.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProfiles(result);
  }, [searchText, selectedTag, profiles]);

  const uniqueTags = [...new Set(profiles.flatMap(p => p.tags))];

  const renderItem = ({ item }: { item: Profile }) => (
    <View style={[styles.card, { borderLeftColor: item.color }]}>
      <View style={styles.profileCircle} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Section Title */}
      <Text style={styles.sectionTitle}>Filter Tags</Text>

      {/* Filter Tags */}
      <View style={styles.filterTags}>
        {uniqueTags.map(tag => (
          <TouchableOpacity
            key={tag}
            onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
          >
            <Text style={[styles.tag, selectedTag === tag && styles.activeTag]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setSelectedTag(null)}>
          <Text style={styles.clearFilter}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended Profiles */}
      <FlatList
        data={filteredProfiles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="find a friend..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  filterTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 12,
  },
  activeTag: {
    backgroundColor: '#FFD700',
    fontWeight: 'bold',
  },
  clearFilter: {
    fontSize: 20,
    marginLeft: 5,
    color: '#999',
  },
  list: {
    gap: 10,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 15,
    borderRadius: 20,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 2,
    width: '30%',           
    backgroundColor: '#aaa',
    alignSelf: 'center',    
    marginTop: 10,
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: -20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
});

export default SearchScreen;
