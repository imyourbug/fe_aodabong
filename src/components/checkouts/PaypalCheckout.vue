<template>
  <div id="paypal-button"></div>
</template>

<script setup>
import { onMounted, defineProps, inject } from "vue";

const emitter = inject("emitter");

const props = defineProps({
  total_money: Number,
});

const reload = () => {
  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
        height: 45,
        tagline: false,
        layout: "horizontal",
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: props.total_money,
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        if (order.status === "COMPLETED") {
          emitter.emit("CheckoutSuccess");
          alert("Thanh toán thành công");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    })
    .render("#paypal-button");
};

onMounted(() => {
  reload();
});
</script>
<style scoped></style>
