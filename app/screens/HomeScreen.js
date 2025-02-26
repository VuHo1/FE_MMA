import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState(['Tất cả', 'Dưỡng da', 'Trang điểm', 'Nước hoa']);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [products, setProducts] = useState([]);

    // Dữ liệu mẫu sản phẩm
    useEffect(() => {
        const fetchProducts = () => {
            setProducts([
                { id: 1, name: 'Kem dưỡng ẩm', category: 'Dưỡng da', price: '350.000đ', image: 'https://tse2.mm.bing.net/th?id=OIP.qSo8MiBYkTPspv_kVdl1swHaHa&pid=Api&P=0&h=180' },
                { id: 2, name: 'Son môi đỏ', category: 'Trang điểm', price: '250.000đ', image: 'https://tse4.mm.bing.net/th?id=OIP.HMshvDx8f7k3f0KcSDvmuAHaHa&pid=Api&P=0&h=180' },
                { id: 3, name: 'Nước hoa Chanel', category: 'Nước hoa', price: '1.200.000đ', image: 'https://tse3.mm.bing.net/th?id=OIP.SMhgymce4UytpabSHD6vtAHaHa&pid=Api&P=0&h=180' },
            ]);
        };
        fetchProducts();
    }, []);

    // Lọc sản phẩm theo danh mục
    const filteredProducts = selectedCategory === 'Tất cả'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Shop Mỹ Phẩm</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="cart-outline" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="gray" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Danh mục sản phẩm */}
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.categoryItem,
                            selectedCategory === item && styles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory(item)}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Danh sách sản phẩm */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SkinTest')}>
                <Text style={styles.btn1}>Kiểm tra loại da</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Routine')}>
                <Text style={styles.btn1}>Tham khảo Lộ trình chăm sóc da</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
    categoryItem: {
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginRight: 10,
    },
    selectedCategory: {
        backgroundColor: '#ff6347',
    },
    categoryText: {
        fontWeight: 'bold',
        color: '#333',
    },
    productCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        margin: 5,
        elevation: 3,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#ff6347',
        marginTop: 3,
    },
    loginButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f4511e',
        borderRadius: 8,
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'yellow',
        borderRadius: 8,
    },
    btn1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
    }
});

export default HomeScreen;
