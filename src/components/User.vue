<template>
  <div class="user-container">
    <div class="user-list">
      <h2>결제 리스트</h2>
      <ul v-if="people.length > 0">
        <li v-for="(person, index) in people" :key="index">
          <div class="person-info">
            <span>{{ person.name }} - {{ person.total }} 원</span>
            <div class="button-group">
              <button @click="confirmCheckout(person)" class="checkout-button">결제하기</button>
              <button @click="removePerson(index)" class="delete-button">삭제하기</button>
            </div>            
          </div>
        </li>
      </ul>
      <p v-else>결제할 사용자가 없습니다.</p>
      <button v-if="people.length === 0" @click="refreshPage" class="shopping-button">새로고침</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "User",
  computed: {
    ...mapState(["people"]),
  },
  methods: {
    ...mapMutations(["SelectedPerson", "removeUserFromUserlist"]),
    confirmCheckout(person) {
      const IMP = window.IMP;
      IMP.init('imp38377537');

      const paymentData = {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `merchant_${new Date().getTime()}`,
        name: `${person.name} 님의 결제`,
        amount: parseInt(person.total.replace(/,/g, ''), 10),
        buyer_name: person.name, 
        buyer_tel: '010-1234-5678',
        buyer_email: 'example@example.com',
      };

      IMP.request_pay(paymentData, (rsp) => {
        if (rsp.success) {
          alert(`${person.name}님의 결제가 성공적으로 완료되었습니다.`);
          this.removeUserFromUserlist(person);
        } else {
          alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}.`);
        }
      });
    },
    removePerson(index) {
      const personToRemove = this.people[index];
      if (confirm(`${personToRemove.name} 님을(를) 삭제하시겠습니까?`)) {
        this.removeUserFromUserlist(personToRemove);
      }
    },
    refreshPage() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.user-list {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h2 {
  font-size: 36px;
}

ul {
  padding: 0;
}

li {
  font-size: 20px;
  list-style: none;
}

.person-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.person-text {
  flex-grow: 1;
}

.button-group {
  display: flex;
  align-items: center;
}
.checkout-button {
  padding: 10px 10px; 
  margin-left: 20px;
  margin-right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px; 
  cursor: pointer;
  font-size: 16px; 
}

.shopping-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
}

.delete-button {
  padding: 10px 10px;
  background-color: #7a7a7a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
