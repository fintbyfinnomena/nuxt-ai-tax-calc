<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <RadioGroup default-value="ปานกลาง" class="flex justify-center gap-20 mt-5">
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r1" value="สูง" />
      <Label for="r1">สูง</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r2" value="ปานกลาง" />
      <Label for="r2">ปานกลาง</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r3" value="ต่ำ" />
      <Label for="r3">ต่ำ</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r3" value="ต่ำมาก" />
      <Label for="r3">ต่ำมาก</Label>
    </div>
  </RadioGroup>
</template>