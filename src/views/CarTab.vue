<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Carrito</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Carrito</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card v-for="item in items" :key="item.id">
        <ion-card-header>
          <ion-card-title>{{ item.name }}</ion-card-title>
          <ion-card-subtitle>
            <ion-label>Cantidad: {{ item.quantity }} - </ion-label>
            <ion-label>Precio unitario: ${{ item.price }}</ion-label>
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-label>SubTotal: ${{ item.total }} </ion-label>
          <br/> <button v-on:click="updateCar(item.id, item.quantity)">Eliminar</button>
        </ion-card-content>
      </ion-card>
      <ion-label>Total: ${{ total }}</ion-label> 
      <ion-loading class="custom-loading" trigger="open-loading" message="Cargando Productos" :isOpen="loading"></ion-loading>
      <ion-toast :is-open="showError" position="middle" color="danger"
        message="Ocurrió un error al obtener la información." :duration="5000"></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonToast, IonLoading, IonList, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';
import { ref } from 'vue';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import vueCookies from 'vue-cookies'

type CartItem = {
  id: string,
  name: string,
  price: number,
  quantity: number,
  total: string
}

const items = ref<CartItem[]>();
const loading = ref<boolean>(true);
const showError = ref<boolean>(false)
const total = ref<string>();

const updateCar = async (id, quantity) => {
  console.log('Add to car value:', id);
  await addItemToCar(id, quantity * -1);
  loading.value = true;
  await getCart();

  console.log('Total:', total.value);

  if (total.value === 0.00)
    vueCookies.set('cartId', '', "3h");

  let cartId = vueCookies.get('cartId');
  console.log('Cart Id cookie:', cartId);
}

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
  } catch (err) {
    console.log(err);
    showError.value = true;
  }

  loading.value = false;
};

const getCart = async () => {
  let cartId = vueCookies.get('cartId');
  if (cartId === null)
  {
    loading.value = false;
    return;
  }

  loading.value = true;
  const options = {
    url: 'http://localhost:3000/shopping-cart/' + cartId
  };
  try {
    const response: HttpResponse = await CapacitorHttp.get(options);
    console.log('Cart response:', JSON.stringify(response));
    console.log('Cart response.data:', JSON.stringify(response.data));
    console.log('Cart response.data.items:', JSON.stringify(response.data.items));
    console.log('Cart response.data.total:', response.data.total);

    total.value = response.data.total;
    const filteredList = response.data.items.filter((e) => e.quantity != 0).map((e) => { return e});
    console.log('Current filter value:', JSON.stringify(filteredList));
    items.value = filteredList;

    console.log('Cart items:', JSON.stringify(items.value));
    console.log('Cart total:', total.value);

  } catch (err) {
    showError.value = true;
  }

  loading.value = false;
};

getCart();
</script>
