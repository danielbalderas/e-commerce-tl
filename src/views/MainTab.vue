<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="productsTab" href="/tabs/productsTab">
          <ion-icon aria-hidden="true" :icon="list" />
          <ion-label>Productos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="carTab" href="/tabs/carTab">
          <ion-icon aria-hidden="true" :icon="cart" />
          <ion-label>Carrito</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="notificationsTab" href="/tabs/notificationsTab">
          <ion-icon aria-hidden="true" :icon="notifications" />
          <ion-label>Notificaciones</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { list, cart, notifications } from 'ionicons/icons';
</script>
