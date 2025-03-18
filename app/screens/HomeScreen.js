import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/v1/products' : 'http://localhost:8000/api/v1/products';

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGender, setSelectedGender] = useState('Tất cả');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                if (response.ok && result.data) {
                    setProducts(result.data);
                } else {
                    console.error('Error fetching products:', result.message);
                }
            } catch (error) {
                console.error('Network error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        (selectedGender === 'Tất cả' || product.gender === selectedGender) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Shop Mỹ Phẩm</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="cart-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="gray" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.filterContainer}>
                {['Tất cả', 'Men', 'Women', 'Unisex'].map(gender => (
                    <TouchableOpacity
                        key={gender}
                        style={[styles.filterButton, selectedGender === gender && styles.selectedFilter]}
                        onPress={() => setSelectedGender(gender)}
                    >
                        <Text style={styles.filterText}>{gender}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#ff6347" />
            ) : (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price.toLocaleString()}đ</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    title: { fontSize: 22, fontWeight: 'bold' },
    headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f1f1', borderRadius: 10, paddingHorizontal: 10, height: 40, marginBottom: 10 },
    searchInput: { flex: 1, marginLeft: 10 },
    filterContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 },
    filterButton: { padding: 10, backgroundColor: '#f1f1f1', borderRadius: 10, marginHorizontal: 5 },
    selectedFilter: { backgroundColor: '#ff6347' },
    filterText: { fontWeight: 'bold', color: '#333' },
    productCard: { flex: 1, backgroundColor: '#fff', padding: 10, borderRadius: 10, alignItems: 'center', margin: 5, elevation: 3 },
    productImage: { width: 100, height: 100, borderRadius: 10 },
    productName: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
    productPrice: { fontSize: 14, color: '#ff6347', marginTop: 3 }
});

export default HomeScreen;
