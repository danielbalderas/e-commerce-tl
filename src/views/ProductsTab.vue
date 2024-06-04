<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Productos</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar show-clear-button="always" :debounce="1000" @ionInput="handleInput($event)"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Productos</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item>
        <ion-select
          interface="popover"
          placeholder="Categorías"
          @ionChange="handleChange($event)">
          <ion-select-option v-for="category in categories" :value="category.id">{{category.name}}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-list>
        <ion-item v-for="item in products" :key="item.id">
          <div class="mainContainer">
            <div class="container">
              <ion-label class="title">{{ item.name }}</ion-label>
              <ion-label class="category">{{ categories.find(category => category.id === item.category).name }}</ion-label>
              <ion-label class="price">${{ item.price }}</ion-label>
            </div>
            <button v-on:click="updateCar(item.id)" class="btn red"  type="button">Agregar al carrito</button>
          </div>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      <ion-loading class="custom-loading" trigger="open-loading" message="Cargando" :isOpen="loading"></ion-loading>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonToast, IonLoading, IonList, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSelect, IonSelectOption, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, IonInfinite, toastController } from '@ionic/vue';
import { ref, reactive } from 'vue';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import vueCookies from 'vue-cookies'
import { Storage } from '@ionic/storage';

type Product = {
  id: string,
  name: string,
  price: string,
  category: string
}

type Category = {
  id: string,
  name: string
}

type AddItemResponse = {
	message: string,
	cartId: string
}

let allProducts = ref<Product[]>([]);
let filterProducts = ref<Product[]>([]);
let products = reactive([])
let addItemResponse = ref<AddItemResponse>()
let query: string = ''
const categories = ref<Category[]>([]);
const loading = ref<boolean>(true);

const showToast = async (message) => {
  const toast = await toastController.create({
          message: message,
          duration: 5000,
          position: 'bottom',
          color: 'danger'
        });

  await toast.present();
}

const handleChange = async (ev) => { 
  console.log('Current value:', ev.detail.value);
  await getProductsByCategory(ev.detail.value);
}

const updateCar = async (item) => {
  console.log('Add to car value:', item);
  await addItemToCar(item, 1);
}

const handleInput = (event) => {
  query = event.target.value.toLowerCase();
  console.log('Search query:', query);
  products.splice(0)

  if (query === '')
  {
    generateItems(allProducts);
  }
  else
  {
    filterProducts.value = allProducts.value.filter((e) => e.name.toLowerCase().indexOf(query.toLowerCase()) != -1).map((e) => { return e});
    generateItems(filterProducts);
  }
}

const getCategories = async () => {
  const options = {
    url: 'http://localhost:3000/categories/'
  };
  try {
    const response: HttpResponse = await CapacitorHttp.get(options);
    console.log("response.data" + JSON.stringify(response.data))

    if (JSON.stringify(response.data).includes('error'))
    {
      await showToast("Ocurrió un error al obtener la información intente de nuevo"); 
    }
    else
    {
      categories.value = response.data
    }
    } catch (err) {
      await showToast(err.message);
    }
};

const getProductsByCategory = async (category) => {
  loading.value = true;

  const options = {
    url: 'http://localhost:3000/products?category=' + category
  };
  try {
    const response: HttpResponse = await CapacitorHttp.get(options);
    if (JSON.stringify(response.data).includes('error'))
    {
      await showToast("Ocurrió un error al obtener la información intente de nuevo"); 
    }
    else
    {
      allProducts.value = response.data
      products.splice(0)

      if (query === '')
      {
        generateItems(allProducts);
      }
      else
      {
        filterProducts.value = allProducts.value.filter((e) => e.name.toLowerCase().indexOf(query.toLowerCase()) != -1).map((e) => { return e})
        generateItems(filterProducts);
      }

      console.log('API Values:', JSON.stringify(response.data));
      console.log('Current products value:', JSON.stringify(products));
    }
  } catch (err) {
    await showToast(err.message);
  }

  loading.value = false;
};

const generateItems = (items) => {
    console.log('items:', JSON.stringify(items.value));
    const count = products.length;
    console.log('count:', count);
    for (let i = count; i < count + 10; i++) {
      if (items.value[i] !== undefined)
      {
        console.log("item: " + JSON.stringify(items.value[i]))
        products.push(items.value[i]);
      }
      else
      {
        return;
      }
    }
  };

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  console.log("query: " + query)
    if (query === '' || query === null)
    {
      generateItems(allProducts);
    }
    else
    {
      filterProducts.value = allProducts.value.filter((e) => e.name.toLowerCase().indexOf(query.toLowerCase()) != -1).map((e) => { return e})
      generateItems(filterProducts);
    }
    setTimeout(() => ev.target.complete(), 500);
  };
    
const getProducts = async () => {
  const options = {
    url: 'http://localhost:3000/products'
  };
  try {
    await getCategories();
    const response: HttpResponse = await CapacitorHttp.get(options);
    console.log("response.data" + JSON.stringify(response.data))

    if (JSON.stringify(response.data).includes('error'))
    {
      await showToast("Ocurrió un error al obtener la información intente de nuevo"); 
    }
    else
    {
      allProducts.value = response.data
      generateItems(allProducts);
    }
    // const store = new Storage();
    // await store.create();
    // await storage.set('products', JSON.stringify(response.data));
  } catch (err) {
    console.log(err);
    await showToast(err.message);
  }

  loading.value = false;
};

const addItemToCar = async (productId, quantity) => {
  loading.value = true;

  let cartId = vueCookies.get('cartId');
  if (cartId === null)
    cartId = '';

  console.log('Cart Id:', cartId);
  console.log('Request:', JSON.stringify({ productId: productId, quantity: quantity, cartId: cartId }));

  const options = {
    url: 'http://localhost:3000/shopping-cart',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ productId: productId, quantity: quantity, cartId: cartId }),
  };
  try {
    const response: HttpResponse = await CapacitorHttp.post(options);
    if (JSON.stringify(response.data).includes('error'))
    {
      await showToast("Ocurrió un error al agregar el item al carrito, intente nuevamente"); 
    }
    else
    {
      addItemResponse.value = response.data
      console.log('Cart data:', JSON.stringify(response.data));
      vueCookies.set('cartId', addItemResponse.value.cartId, "3h");
      cartId = vueCookies.get('cartId');
      console.log('Cart Id cookie:', cartId);
    }
  } catch (err) {
    console.log(err);
    await showToast(err.message);
  }

  loading.value = false;
};

// Llamamos a la función getProducts() para que se ejecute al cargar la vista
getProducts();
</script>
