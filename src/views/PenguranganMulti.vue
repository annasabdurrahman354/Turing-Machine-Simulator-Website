<template>
<div class="px-4 flex flex-col justify-center items-center bg-gray-200 h-full w-full">
    <div class="mb-8">
        <div class="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 filter drop-shadow-md">
            Pengurangan 
        </div>
        <div class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 filter drop-shadow-md">
            Multitrack
        </div>
    </div>

    <div class="w-1/2 min-h-min bg-white shadow-md flex flex-col justify-center items-center px-4 py-4 rounded-lg gap-4">
        <div class="w-full max-h-16 flex justify-center items-center rounded-lg gap-4">
            <input v-model="a" :disabled="onGenerate" class="form-control" type="number" name="a" id="a" required>
            <div class="text-lg">-</div>
            <input v-model="b" :disabled="onGenerate" class="form-control" type="number" name="b" id="b" required>
        </div>
        <div v-if="!onGenerate">
            <button v-on:click="generate" type="submit" class="btn btn-indigo min-w-min">Generate</button>
        </div>
        <div v-if="onGenerate && !onStart">
            <button v-on:click="generate" type="submit" class="btn btn-indigo min-w-min">Reset</button>
        </div>
    </div>

    <div v-if="onGenerate" class="mt-4 w-min-w max-h-48 bg-white shadow-md px-4 rounded-lg flex flex-col justify-center items-center">
        <div class="mt-4" v-if="!onStart">
            <button v-on:click="start" class="btn btn-indigo">Mulai</button>
        </div>
        <div class="grid grid-flow-col auto-cols-max items-center justify-center gap-2 my-6">
            <div v-for="tape1 in tapes1" v-bind:key="tape1" :class="{ 'animate-pulse bg-green-400 text-white': tape1.current, 'bg-white text-gray-500 shadow': !tape1.current, }" class="h-8 w-8 text-lg text-bold shadow">{{tape1.symbol}}</div>
        </div>
        <div class="grid grid-flow-col auto-cols-max items-center justify-center gap-2 mb-6">
            <div v-for="tape2 in tapes2" v-bind:key="tape2" :class="{ 'animate-pulse bg-green-400 text-white': tape2.current, 'bg-white text-gray-500 shadow': !tape2.current, }" class="h-8 w-8 text-lg text-bold shadow">{{tape2.symbol}}</div>
        </div>
    </div>
    <div v-if="finish" class="bg-white rounded rounded-lg shadow-md py-1 px-6 mt-4 justify-center items-center">
        <div class="text-gray-600 text-lg font-bold mb-3">Hasil</div>
        <div class="text-green-400 text-lg mb-3">{{hasil}}</div>
    </div>
    <div class="bg-white rounded rounded-lg shadow-md py-3 px-6 mt-4 mb-8">
        <div class="text-gray-600 text-lg font-bold mb-3">Atur Kecepatan <span class="text-gray-400 text-sm">(ms)</span></div>
        <input v-model="delay" class="form-control mb-2" type="number" min="50" max="3000" name="a" id="a" step="50" required>
        <input type="range" min="50" max="3000" step="50" v-model="delay">
    </div>
</div>
</template>

<script>
export default {
  name: 'Pengurangan Multitrack',
  props: {

  },
  data(){
        return {
            tapes1: [ ],
            tapes2: [ ],
            onGenerate: false,
            onStart: false,
            finish: false,
            a: 0,
            b: 0,
            active:3,
            before:3,
            hasil:0,
            delay: 200
      }
  },
  methods: {
    generate() {
        if(this.onGenerate == false){
            this.onGenerate = true
            this.tapes1.length = 0
            this.tapes2.length = 0
            for(var i = 0; i < 3; i++){
                this.tapes1.push({symbol:"b", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            if(this.a >= 0){
                this.tapes1.push({symbol:"x", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            if(this.a < 0){
                this.tapes1.push({symbol:"y", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            for(i = 0; i < Math.abs(this.a); i++){
                this.tapes1.push({symbol:"0", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            this.tapes1.push({symbol:"1", current:false})
            this.tapes2.push({symbol:"b", current:false})
            if(this.b >= 0){
                this.tapes1.push({symbol:"x", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            if(this.b < 0){
                this.tapes1.push({symbol:"y", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            for(i = 0; i < Math.abs(this.b); i++){
                this.tapes1.push({symbol:"0", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            this.tapes1.push({symbol:"1", current:false})
            this.tapes2.push({symbol:"b", current:false})
            for(i = 0; i < 3; i++){
                this.tapes1.push({symbol:"b", current:false})
                this.tapes2.push({symbol:"b", current:false})
            }
            this.tapes1[this.active].current = true 
            this.tapes2[this.active].current = true 
        }
        else{
            this.onGenerate = false
        }
    },
    start(){
        this.onStart = true
        alert("Mulai")
        this.q0(this.tapes1, this.tapes2, this.before, this.active)
    },

    q0(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q1(tapes1, tapes2, active, active+1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q2(tapes1, tapes2, active, active+1), this.delay);
        }
    },

    q1(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q1(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == '1' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'y','x')
            setTimeout(() => this.q3(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q2(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q2(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == '1' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'x','x')
            setTimeout(() => this.q3(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q3(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'x','y')
            setTimeout(() => this.q3(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'y','y')
            setTimeout(() => this.q3(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q3(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == '1' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q8(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q4(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'x','x')
            setTimeout(() => this.q5(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'y','x')
            setTimeout(() => this.q7(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q5(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q5(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q9(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q6(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'x','x')
            setTimeout(() => this.q7(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'y','x')
            setTimeout(() => this.q5(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q7(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q7(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q18(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q8(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q8(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'x','y')
            setTimeout(() => this.q4(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'y','y')
            setTimeout(() => this.q6(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q9(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q10(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q10(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q10(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q11(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q11(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q11(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q12(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q14(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q12(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q12(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q13(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q13(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'x','b')
            setTimeout(() => this.q16(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q14(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q14(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q15(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q15(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'y','b')
            setTimeout(() => this.q16(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q16(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q16(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'1','b')
            setTimeout(() => this.q17(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q17(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        for(var i = 0; i < tapes1.length; ++i){
            if(tapes1[i].symbol == "0"){
                this.hasil++;
            }
            if(tapes1[i].symbol == "y"){
                this.min = true
            }
        }
        if(this.min == true){
            this.hasil = this.hasil*(-1)
        }
        
        this.finish = true
    },
    // FINAL STATE ALERT

    q18(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q22(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q22(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q19(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q19(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q19(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'x','x')
            setTimeout(() => this.q19(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'x','y')
            setTimeout(() => this.q19(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'y','x')
            setTimeout(() => this.q19(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'y','y')
            setTimeout(() => this.q19(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q20(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q20(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q21(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q23(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q23(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q21(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q21(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'x','x')
            setTimeout(() => this.q21(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'x','y')
            setTimeout(() => this.q21(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'y','x')
            setTimeout(() => this.q21(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'y','y')
            setTimeout(() => this.q21(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'b','b')
            setTimeout(() => this.q18(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q22(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q22(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'y','b')
            setTimeout(() => this.q22(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'y' ){
            this.changeTapes(active,'x','b')
            setTimeout(() => this.q22(tapes1, tapes2, active, active +1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'1','b')
            setTimeout(() => this.q17(tapes1, tapes2, active, active +1), this.delay);
        }
    },

    q23(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'x' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'1','b')
            setTimeout(() => this.q24(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'y' && tapes2[active].symbol == 'x' ){
            this.changeTapes(active,'1','b')
            setTimeout(() => this.q26(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q24(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q24(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q25(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q25(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'x','b')
            setTimeout(() => this.q17(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q26(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == '0' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q26(tapes1, tapes2, active, active -1), this.delay);
        }
        else if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'0','b')
            setTimeout(() => this.q27(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    q27(tapes1, tapes2, before, active){          
        this.changeActive(tapes1, tapes2, before, active)
        if(tapes1[active].symbol == 'b' && tapes2[active].symbol == 'b' ){
            this.changeTapes(active,'y','b')
            setTimeout(() => this.q17(tapes1, tapes2, active, active -1), this.delay);
        }
    },

    changeTapes(active, tape1, tape2){
        this.tapes1[active].symbol = tape1
        this.tapes2[active].symbol = tape2
    },
    changeActive(tapes1, tapes2, before, active){
        tapes1[before].current = false; 
        tapes2[before].current = false; 
        this.before = active
        tapes1[active].current = true; 
        tapes2[active].current = true; 
    }
  },
  mounted: function() {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>