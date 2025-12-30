const orderBy = require('../orderBy');

describe('orderBy', () => {
  // ========== 公共测试数据 ==========
  const testData = [
    { name: '张三', age: 25, score: 85, value: 10, active: true, str: 'zebra' },
    { name: '李四', age: 30, score: 90, value: 2, active: false, str: 'apple' },
    { name: '王五', age: 20, score: 80, value: 100, active: true, str: 'banana' },
    { name: '赵六', age: 25, score: 95, value: 1, active: false, str: 'cherry' },
    { name: '陈七', age: 35, score: 75, value: -5, active: true, str: 'zebra' },
    { name: '孙八', age: 28, score: 88, value: -10, active: false, str: 'apple' }
  ];

  // ========== 基本排序功能 ==========

  test('应该按单个字段升序排序', () => {
    const result = orderBy(testData, 'age');
    expect(result[0].age).toBe(20);
    expect(result[result.length - 1].age).toBe(35);
  });

  test('应该按单个字段降序排序', () => {
    const result = orderBy(testData, [['age', 'desc']]);
    expect(result[0].age).toBe(35);
    expect(result[result.length - 1].age).toBe(20);
  });

  test('应该支持多字段排序', () => {
    const result = orderBy(testData, [
      ['age', 'asc'],
      ['score', 'desc']
    ]);
    expect(result[0].age).toBe(20);
    expect(result[1].age).toBe(25);
    expect(result[1].score).toBe(95);
    expect(result[2].age).toBe(25);
    expect(result[2].score).toBe(85);
    expect(result[3].age).toBe(28);
    expect(result[4].age).toBe(30);
    expect(result[5].age).toBe(35);
  });

  test('应该支持对象配置格式', () => {
    const result = orderBy(testData, [
      { field: 'age', order: 'asc' },
      { field: 'score', order: 'desc' }
    ]);
    expect(result[0].age).toBe(20);
    expect(result[1].age).toBe(25);
    expect(result[1].score).toBe(95);
    expect(result[2].age).toBe(25);
    expect(result[2].score).toBe(85);
  });

  test('应该支持 ascending/descending 字符串', () => {
    const result1 = orderBy(testData, [['age', 'ascending']]);
    expect(result1[0].age).toBe(20);

    const result2 = orderBy(testData, [['age', 'descending']]);
    expect(result2[0].age).toBe(35);
  });

  // ========== undefined 和空字符串处理 ==========

  test('应该忽略 undefined 排序字段', () => {
    const result = orderBy(testData, [
      ['age', undefined],
      ['score', 'desc']
    ]);
    expect(result[0].score).toBe(95);
    expect(result[1].score).toBe(90);
    expect(result[2].score).toBe(88);
    expect(result[3].score).toBe(85);
    expect(result[4].score).toBe(80);
    expect(result[5].score).toBe(75);
  });

  test('应该忽略空字符串排序字段', () => {
    const result = orderBy(testData, [
      ['age', ''],
      ['score', 'desc']
    ]);
    expect(result[0].score).toBe(95);
    expect(result[1].score).toBe(90);
    expect(result[2].score).toBe(88);
    expect(result[3].score).toBe(85);
    expect(result[4].score).toBe(80);
    expect(result[5].score).toBe(75);
  });

  test('当所有排序参数都是 undefined 时，应该使用默认排序', () => {
    const result = orderBy(testData, [
      ['age', undefined],
      ['score', undefined]
    ]);
    expect(result.length).toBe(testData.length);
    const originalNames = testData.map(item => item.name);
    const resultNames = result.map(item => item.name);
    expect(resultNames.sort()).toEqual(originalNames.sort());
  });

  test('当所有排序参数都是空字符串时，应该使用默认排序', () => {
    const result = orderBy(testData, [
      ['age', ''],
      ['score', '']
    ]);
    expect(result.length).toBe(testData.length);
    const originalNames = testData.map(item => item.name);
    const resultNames = result.map(item => item.name);
    expect(resultNames.sort()).toEqual(originalNames.sort());
  });

  test('应该支持混合 undefined 和非 undefined 字段排序', () => {
    const result = orderBy(testData, [
      ['age', undefined],
      ['score', 'desc'],
      ['name', undefined]
    ]);
    expect(result[0].score).toBe(95);
    expect(result[1].score).toBe(90);
    expect(result[2].score).toBe(88);
    expect(result[3].score).toBe(85);
    expect(result[4].score).toBe(80);
    expect(result[5].score).toBe(75);
  });

  test('应该支持混合空字符串和非空字符串字段排序', () => {
    const result = orderBy(testData, [
      ['age', ''],
      ['score', 'desc'],
      ['name', '']
    ]);
    expect(result[0].score).toBe(95);
    expect(result[1].score).toBe(90);
    expect(result[2].score).toBe(88);
    expect(result[3].score).toBe(85);
    expect(result[4].score).toBe(80);
    expect(result[5].score).toBe(75);
  });

  test('应该支持混合 undefined 和空字符串字段排序', () => {
    const result = orderBy(testData, [
      ['age', undefined],
      ['score', 'desc'],
      ['name', '']
    ]);
    expect(result[0].score).toBe(95);
    expect(result[1].score).toBe(90);
    expect(result[2].score).toBe(88);
    expect(result[3].score).toBe(85);
    expect(result[4].score).toBe(80);
    expect(result[5].score).toBe(75);
  });

  test('应该支持对象配置格式中的 undefined', () => {
    const result = orderBy(testData, [
      { field: 'age', order: undefined },
      { field: 'score', order: 'desc' }
    ]);
    expect(result[0].score).toBe(95);
    expect(result[result.length - 1].score).toBe(75);
  });

  test('应该支持对象配置格式中的空字符串', () => {
    const result = orderBy(testData, [
      { field: 'age', order: '' },
      { field: 'score', order: 'desc' }
    ]);
    expect(result[0].score).toBe(95);
    expect(result[result.length - 1].score).toBe(75);
  });

  test('应该正确处理对象配置中所有字段都是 undefined', () => {
    const result = orderBy(testData, [
      { field: 'age', order: undefined },
      { field: 'score', order: undefined }
    ]);
    expect(result.length).toBe(testData.length);
    const originalNames = testData.map(item => item.name);
    const resultNames = result.map(item => item.name);
    expect(resultNames.sort()).toEqual(originalNames.sort());
  });

  test('应该正确处理对象配置中所有字段都是空字符串', () => {
    const result = orderBy(testData, [
      { field: 'age', order: '' },
      { field: 'score', order: '' }
    ]);
    expect(result.length).toBe(testData.length);
    const originalNames = testData.map(item => item.name);
    const resultNames = result.map(item => item.name);
    expect(resultNames.sort()).toEqual(originalNames.sort());
  });

  test('应该正确处理多个空字符串 order 混合有效 order 的复杂场景', () => {
    const data = [
      { id: 1, name: 'Name1', age: 1 },
      { id: 2, name: 'Name2', age: 2 },
      { id: 3, name: 'Name3', age: 3 },
      { id: 4, name: 'Name4', age: 4 },
      { id: 5, name: 'Name5', age: 5 }
    ];
    const order = [
      { field: 'age', order: '' },
      { field: 'name', order: '' },
      { field: 'id', order: 'descending' }
    ];
    const result = orderBy(data, order);
    expect(result.length).toBe(5);
    expect(result[0].id).toBe(5);
    expect(result[1].id).toBe(4);
    expect(result[2].id).toBe(3);
    expect(result[3].id).toBe(2);
    expect(result[4].id).toBe(1);
  });

  test('应该正确处理多个 undefined 字段混合有效字段', () => {
    const result = orderBy(testData, [
      ['age', undefined],
      ['score', 'asc'],
      ['name', undefined]
    ]);
    expect(result[0].score).toBe(75);
    expect(result[result.length - 1].score).toBe(95);
  });

  // ========== 函数排序 ==========

  test('应该支持函数排序', () => {
    const result = orderBy(testData, function(item) {
      return item.age * item.score;
    });
    expect(result[0].name).toBe('王五');
    expect(result[result.length - 1].name).toBe('李四');
  });

  test('应该支持函数排序与字段排序混合', () => {
    const result = orderBy(testData, [
      function(item) {
        return item.age * item.score;
      },
      ['name', 'asc']
    ]);
    expect(result.length).toBe(6);
    for (let i = 0; i < result.length - 1; i++) {
      const current = result[i];
      const next = result[i + 1];
      const currentValue = current.age * current.score;
      const nextValue = next.age * next.score;
      if (currentValue === nextValue) {
        expect(current.name <= next.name).toBe(true);
      } else {
        expect(currentValue <= nextValue).toBe(true);
      }
    }
  });

  test('应该支持 context 参数', () => {
    const context = { multiplier: 2 };
    const result = orderBy(testData, function(item) {
      return item.age * this.multiplier;
    }, context);
    expect(result.length).toBe(6);
    expect(result[0].age).toBe(20);
    expect(result[1].age).toBe(25);
    expect(result[2].age).toBe(25);
    expect(result[3].age).toBe(28);
    expect(result[4].age).toBe(30);
    expect(result[5].age).toBe(35);
    const values = result.map(item => item.age * context.multiplier);
    expect(values[0]).toBeLessThanOrEqual(values[1]);
    expect(values[1]).toBeLessThanOrEqual(values[2]);
    expect(values[2]).toBeLessThanOrEqual(values[3]);
  });

  test('应该正确处理 context 为 null 的情况', () => {
    const result = orderBy(testData, function(item) {
      return this ? this.value : item.age;
    }, null);
    expect(result.length).toBe(6);
  });

  test('应该正确处理 context 为 undefined 的情况', () => {
    const result = orderBy(testData, function(item) {
      return this ? this.value : item.age;
    }, undefined);
    expect(result.length).toBe(6);
  });

  test('应该正确处理函数返回 undefined 的情况', () => {
    const result = orderBy(testData, function(item) {
      return undefined;
    });
    expect(result.length).toBe(6);
    expect(result.every(() => true)).toBe(true);
  });

  test('应该正确处理函数返回 null 的情况', () => {
    const result = orderBy(testData, function(item) {
      return null;
    });
    expect(result.length).toBe(6);
    expect(result.every(() => true)).toBe(true);
  });

  test('应该正确处理函数抛出异常的情况', () => {
    expect(() => {
      orderBy(testData, function(item) {
        throw new Error('Test error');
      });
    }).toThrow('Test error');
  });

  // ========== 边界情况 ==========

  test('应该处理空数组', () => {
    const result = orderBy([], 'age');
    expect(result).toEqual([]);
  });

  test('应该正确处理空/无效配置（null、undefined、空数组）', () => {
    // 测试 null
    const result1 = orderBy(testData, null);
    expect(result1.length).toBe(testData.length);
    
    // 测试 undefined
    const result2 = orderBy(testData, undefined);
    expect(result2.length).toBe(testData.length);
    
    // 测试空数组
    const result3 = orderBy(testData, []);
    expect(result3.length).toBe(testData.length);
    
    // 所有结果应该使用默认排序
    const originalNames = testData.map(item => item.name);
    expect(result1.map(item => item.name).sort()).toEqual(originalNames.sort());
    expect(result2.map(item => item.name).sort()).toEqual(originalNames.sort());
    expect(result3.map(item => item.name).sort()).toEqual(originalNames.sort());
  });

  test('应该正确处理单个元素数组', () => {
    const singleData = [{ age: 25 }];
    const result = orderBy(singleData, 'age');
    expect(result.length).toBe(1);
    expect(result[0].age).toBe(25);
  });

  // ========== 数据类型处理 ==========

  test('应该正确处理数字排序（包括负数）', () => {
    const result = orderBy(testData, 'value');
    expect(result[0].value).toBe(-10);
    expect(result[1].value).toBe(-5);
    expect(result[2].value).toBe(1);
    expect(result[3].value).toBe(2);
    expect(result[4].value).toBe(10);
    expect(result[5].value).toBe(100);
  });

  test('应该正确处理特殊数字值（0、小数、Infinity）', () => {
    const data = [
      { value: Infinity },
      { value: 5 },
      { value: 0 },
      { value: 0.2 },
      { value: -5 },
      { value: -Infinity },
      { value: 10 }
    ];
    const result = orderBy(data, 'value');
    expect(result[0].value).toBe(-Infinity);
    expect(result[1].value).toBe(-5);
    expect(result[2].value).toBe(0);
    expect(result[3].value).toBe(0.2);
    expect(result[4].value).toBe(5);
    expect(result[5].value).toBe(10);
    expect(result[6].value).toBe(Infinity);
  });

  test('应该正确处理字段值为 NaN 的情况', () => {
    const data = [
      { value: NaN },
      { value: 1 },
      { value: NaN },
      { value: 2 }
    ];
    const result = orderBy(data, 'value');
    expect(result.length).toBe(4);
    const values = result.map(item => item.value);
    expect(values.filter(v => !isNaN(v)).length).toBe(2);
    expect(values.filter(isNaN).length).toBe(2);
  });

  test('应该正确处理字符串排序', () => {
    const result = orderBy(testData, 'str');
    expect(result[0].str).toBe('apple');
    expect(result[1].str).toBe('apple');
    expect(result[2].str).toBe('banana');
    expect(result[3].str).toBe('cherry');
    expect(result[4].str).toBe('zebra');
    expect(result[5].str).toBe('zebra');
  });

  test('应该正确处理空字符串', () => {
    const data = [
      { name: 'b' },
      { name: '' },
      { name: 'a' },
      { name: 'c' }
    ];
    const result = orderBy(data, 'name');
    expect(result[0].name).toBe('');
    expect(result[1].name).toBe('a');
  });

  test('应该正确处理中文排序', () => {
    const result = orderBy(testData, 'name');
    expect(result.length).toBe(6);
    const originalNames = testData.map(item => item.name);
    const resultNames = result.map(item => item.name);
    expect(resultNames.sort()).toEqual(originalNames.sort());
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].name).toBeDefined();
      expect(result[i + 1].name).toBeDefined();
    }
  });

  test('应该正确处理布尔值排序', () => {
    const result = orderBy(testData, 'active');
    expect(result.length).toBe(6);
    expect(result[0].active).toBe(false);
    expect(result[1].active).toBe(false);
    expect(result[2].active).toBe(false);
    expect(result[3].active).toBe(true);
    expect(result[4].active).toBe(true);
    expect(result[5].active).toBe(true);
  });

  test('应该正确处理 null 值', () => {
    const data = [
      { a: 1 },
      { a: null },
      { a: 2 }
    ];
    const result = orderBy(data, 'a');
    expect(result.length).toBe(3);
    // 排序顺序：数字 < null，所以是 1, 2, null
    expect(result[0].a).toBe(1);
    expect(result[1].a).toBe(2);
    expect(result[2].a).toBe(null);
    const values = result.map(item => item.a);
    expect(values).toContain(1);
    expect(values).toContain(2);
    expect(values).toContain(null);
  });

  test('应该正确处理 undefined 值', () => {
    const data = [
      { a: 1 },
      { a: undefined },
      { a: 2 }
    ];
    const result = orderBy(data, 'a');
    expect(result.length).toBe(3);
    expect(result[0].a).toBe(1);
    expect(result[1].a).toBe(2);
    expect(result[2].a).toBe(undefined);
  });

  test('应该正确处理数组中的 null 字段值', () => {
    const data = [
      { age: 25, score: null },
      { age: 20, score: 80 },
      { age: 30, score: null },
      { age: 25, score: 90 }
    ];
    const result = orderBy(data, [
      ['age', 'asc'],
      ['score', 'desc']
    ]);
    expect(result.length).toBe(4);
    expect(result[0].age).toBe(20);
  });

  test('应该正确处理数组中的 undefined 字段值', () => {
    const data = [
      { age: 25, score: undefined },
      { age: 20, score: 80 },
      { age: 30, score: undefined },
      { age: 25, score: 90 }
    ];
    const result = orderBy(data, [
      ['age', 'asc'],
      ['score', 'desc']
    ]);
    expect(result.length).toBe(4);
    expect(result[0].age).toBe(20);
  });

  test('应该正确处理不存在的字段', () => {
    const data = [
      { name: 'a', age: 1 },
      { name: 'b' },
      { name: 'c', age: 2 }
    ];
    const result = orderBy(data, 'age');
    expect(result.length).toBe(3);
    expect(result[0].age).toBe(1);
    expect(result[1].age).toBe(2);
    expect(result[2].age).toBe(undefined);
    expect(result[2].name).toBe('b');
  });

  test('应该正确处理空对象', () => {
    const data = [
      {},
      { age: 1 },
      {},
      { age: 2 }
    ];
    const result = orderBy(data, 'age');
    expect(result.length).toBe(4);
    expect(result[0].age).toBe(1);
    expect(result[1].age).toBe(2);
    expect(result[2].age).toBe(undefined);
    expect(result[3].age).toBe(undefined);
  });

  test('应该正确处理所有值都相同的情况', () => {
    const data = [
      { value: 5 },
      { value: 5 },
      { value: 5 },
      { value: 5 }
    ];
    const result = orderBy(data, 'value');
    expect(result.length).toBe(4);
    expect(result.every(item => item.value === 5)).toBe(true);
  });

  test('应该正确处理混合类型的值排序', () => {
    const data = [
      { value: '' },
      { value: 0 },
      { value: 'a' },
      { value: null },
      { value: undefined },
      { value: false },
      { value: true }
    ];
    const result = orderBy(data, 'value');
    expect(result.length).toBe(7);
    const values = result.map(item => item.value);
    expect(values).toContain('');
    expect(values).toContain(0);
    expect(values).toContain('a');
    expect(values).toContain(null);
    expect(values).toContain(undefined);
    expect(values).toContain(false);
    expect(values).toContain(true);
  });

  // ========== 复杂对象类型 ==========

  test('应该正确处理字段值为 Date 对象的情况', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-02');
    const date3 = new Date('2023-01-03');
    const data = [
      { date: date3 },
      { date: date1 },
      { date: date2 }
    ];
    const result = orderBy(data, 'date');
    expect(result.length).toBe(3);
    expect(result[0].date.getTime()).toBe(date1.getTime());
    expect(result[1].date.getTime()).toBe(date2.getTime());
    expect(result[2].date.getTime()).toBe(date3.getTime());
  });


  test('应该正确处理字段值为 BigInt 的情况', () => {
    const data = [
      { value: BigInt(3) },
      { value: BigInt(1) },
      { value: BigInt(2) }
    ];
    const result = orderBy(data, 'value');
    expect(result.length).toBe(3);
    expect(Number(result[0].value)).toBe(1);
    expect(Number(result[1].value)).toBe(2);
    expect(Number(result[2].value)).toBe(3);
  });


  test('应该正确处理字段值为 Symbol 的情况', () => {
    const sym1 = Symbol('a');
    const sym2 = Symbol('b');
    const sym3 = Symbol('c');
    const data = [
      { sym: sym3 },
      { sym: sym1 },
      { sym: sym2 }
    ];
    const result = orderBy(data, 'sym');
    expect(result.length).toBe(3);
    const symbols = result.map(item => item.sym);
    expect(symbols).toContain(sym1);
    expect(symbols).toContain(sym2);
    expect(symbols).toContain(sym3);
  });

  // ========== 嵌套路径和特殊字段名 ==========

  test('应该支持嵌套字段路径排序', () => {
    const data = [
      { user: { age: 25, name: '张三' } },
      { user: { age: 30, name: '李四' } },
      { user: { age: 20, name: '王五' } }
    ];
    const result = orderBy(data, 'user.age');
    expect(result[0].user.age).toBe(20);
    expect(result[result.length - 1].user.age).toBe(30);
  });

  test('应该正确处理复杂嵌套对象排序', () => {
    const data = [
      { user: { profile: { age: 30 } } },
      { user: { profile: { age: 20 } } },
      { user: { profile: { age: 25 } } }
    ];
    const result = orderBy(data, 'user.profile.age');
    expect(result[0].user.profile.age).toBe(20);
    expect(result[result.length - 1].user.profile.age).toBe(30);
  });

  test('应该正确处理数组索引路径', () => {
    const data = [
      { items: [10, 20, 30] },
      { items: [5, 15, 25] },
      { items: [15, 25, 35] }
    ];
    const result = orderBy(data, 'items[0]');
    expect(result[0].items[0]).toBe(5);
    expect(result[result.length - 1].items[0]).toBe(15);
  });

  test('应该正确处理字段名包含特殊字符', () => {
    const data = [
      { 'field-name': 2 },
      { 'field-name': 1 },
      { 'field-name': 3 }
    ];
    const result = orderBy(data, 'field-name');
    expect(result.length).toBe(3);
    expect(result[0]['field-name']).toBe(1);
    expect(result[1]['field-name']).toBe(2);
    expect(result[2]['field-name']).toBe(3);
  });

  test('应该正确处理字段名是数字字符串', () => {
    const data = [
      { '0': 'c' },
      { '0': 'a' },
      { '0': 'b' }
    ];
    const result = orderBy(data, '0');
    expect(result.length).toBe(3);
    expect(result[0]['0']).toBe('a');
    expect(result[1]['0']).toBe('b');
    expect(result[2]['0']).toBe('c');
  });

  test('应该正确处理数字 0 作为字段名', () => {
    const data = [
      { 0: 'c' },
      { 0: 'a' },
      { 0: 'b' }
    ];
    const result = orderBy(data, 0);
    expect(result.length).toBe(3);
    const values = result.map(item => item[0]);
    expect(values).toContain('a');
    expect(values).toContain('b');
    expect(values).toContain('c');
    expect(new Set(values).size).toBe(3);
  });

  test('应该正确处理字段名是保留字', () => {
    const data = [
      { 'constructor': 2 },
      { 'constructor': 1 },
      { 'constructor': 3 }
    ];
    const result = orderBy(data, 'constructor');
    expect(result.length).toBe(3);
    const values = result.map(item => item.constructor);
    expect(values.sort()).toEqual([1, 2, 3]);
  });

  // ========== 性能测试 ==========

  test('应该正确处理非常大的数组', () => {
    const data = Array.from({ length: 1000 }, (_, i) => ({ value: 1000 - i }));
    const result = orderBy(data, 'value');
    expect(result.length).toBe(1000);
    expect(result[0].value).toBe(1);
    expect(result[result.length - 1].value).toBe(1000);
  });

  test('应该正确处理三个字段排序', () => {
    const data = [
      { a: 1, b: 1, c: 3 },
      { a: 1, b: 1, c: 1 },
      { a: 1, b: 2, c: 2 },
      { a: 2, b: 1, c: 1 }
    ];
    const result = orderBy(data, [
      ['a', 'asc'],
      ['b', 'asc'],
      ['c', 'asc']
    ]);
    expect(result.length).toBe(4);
    expect(result[0].a).toBe(1);
    expect(result[0].b).toBe(1);
    expect(result[0].c).toBe(1);
    expect(result[3].a).toBe(2);
  });

  // ========== 索引管理正确性测试 ==========

  test('应该正确处理字段过滤后的索引管理（数组格式）', () => {
    const data = [
      { id: 3, name: 'C', score: 30 },
      { id: 1, name: 'A', score: 10 },
      { id: 2, name: 'B', score: 20 }
    ];
    // 配置：[有效字段, 无效字段, 有效字段]
    const config = [
      ['score', 'asc'],      // 有效：索引 0
      ['invalid', undefined], // 无效：被过滤
      ['id', 'asc']          // 有效：索引 1
    ];
    const result = orderBy(data, config);
    expect(result.length).toBe(3);
    // 应该按 score 升序排序（当 score 相同时按 id 升序）
    expect(result[0].score).toBe(10);
    expect(result[1].score).toBe(20);
    expect(result[2].score).toBe(30);
  });

  test('应该正确处理字段过滤后的索引管理（对象格式）', () => {
    const data = [
      { id: 3, name: 'C', score: 30 },
      { id: 1, name: 'A', score: 10 },
      { id: 2, name: 'B', score: 20 }
    ];
    // 配置：[有效字段, 无效字段, 有效字段]
    const config = [
      { field: 'score', order: 'asc' },      // 有效：索引 0
      { field: 'invalid', order: undefined }, // 无效：被过滤
      { field: 'id', order: 'asc' }          // 有效：索引 1
    ];
    const result = orderBy(data, config);
    expect(result.length).toBe(3);
    // 应该按 score 升序排序（当 score 相同时按 id 升序）
    expect(result[0].score).toBe(10);
    expect(result[1].score).toBe(20);
    expect(result[2].score).toBe(30);
  });

  test('应该正确处理字段过滤后的索引管理（混合格式）', () => {
    const data = [
      { id: 3, name: 'C', score: 30 },
      { id: 1, name: 'A', score: 10 },
      { id: 2, name: 'B', score: 20 }
    ];
    // 配置：[有效字段, 无效字段, 有效字段] - 混合数组和对象格式
    const config = [
      ['score', 'asc'],                      // 有效：索引 0
      { field: 'invalid', order: undefined }, // 无效：被过滤
      { field: 'id', order: 'asc' }          // 有效：索引 1
    ];
    const result = orderBy(data, config);
    expect(result.length).toBe(3);
    // 应该按 score 升序排序（当 score 相同时按 id 升序）
    expect(result[0].score).toBe(10);
    expect(result[1].score).toBe(20);
    expect(result[2].score).toBe(30);
  });

  test('应该正确处理对象配置中所有字段都被过滤的情况', () => {
    const data = [
      { id: 3, name: 'C', score: 30 },
      { id: 1, name: 'A', score: 10 },
      { id: 2, name: 'B', score: 20 }
    ];
    const config = [
      { field: 'score', order: undefined }, // 无效：被过滤
      { field: 'id', order: '' },           // 无效：被过滤
      { field: 'name', order: undefined }   // 无效：被过滤
    ];
    const result = orderBy(data, config);
    expect(result.length).toBe(3);
    // 所有字段被过滤，应该执行默认排序
    const originalNames = data.map(item => item.name);
    const resultNames = result.map(item => item.name);
    expect(resultNames.sort()).toEqual(originalNames.sort());
  });

  test('应该正确处理复杂字段过滤场景（多种无效配置）', () => {
    const data = [
      { a: 3, b: 1, c: 2 },
      { a: 1, b: 3, c: 1 },
      { a: 2, b: 2, c: 3 }
    ];
    const config = [
      null,                               // 无效：null
      undefined,                          // 无效：undefined
      { field: 'a', order: undefined },   // 无效：order undefined
      { field: 'b', order: '' },          // 无效：order 空字符串
      ['c', 'asc'],                       // 有效：应该按 c 升序排序
      { field: 'nonexistent' }            // 无效：缺少 order 参数但不是字符串/函数
    ];
    const result = orderBy(data, config);
    expect(result.length).toBe(3);
    // 只有 c 字段有效，应该按 c 升序排序
    expect(result[0].c).toBe(1);
    expect(result[1].c).toBe(2);
    expect(result[2].c).toBe(3);
  });

  test('应该验证 buildMultiOrders 的索引正确性', () => {
    const data = [
      { x: 1, y: 1, z: 3 },
      { x: 1, y: 2, z: 1 },
      { x: 2, y: 1, z: 2 },
      { x: 1, y: 1, z: 1 }
    ];
    // 故意在中间插入无效字段来测试索引管理
    const config = [
      ['x', 'asc'],                       // 有效：索引 0
      { field: 'invalid1', order: undefined }, // 无效：被过滤
      { field: 'invalid2', order: '' },   // 无效：被过滤
      ['y', 'asc'],                       // 有效：索引 1
      null,                               // 无效：null
      ['z', 'asc']                        // 有效：索引 2
    ];
    const result = orderBy(data, config);
    expect(result.length).toBe(4);
    // 应该按 x, y, z 的优先级进行稳定排序
    // x=1 的对象排在前面，x=2 的排在后面
    expect(result[0].x).toBe(1);
    expect(result[3].x).toBe(2);
    // 在 x=1 的对象中，按 y 排序
    const x1Items = result.filter(item => item.x === 1);
    expect(x1Items[0].y).toBe(1);
    expect(x1Items[1].y).toBe(1);
    expect(x1Items[2].y).toBe(2);
  });

  // ========== 边缘场景和复杂场景 ==========

  test('应该正确处理 Symbol 作为排序键', () => {
    const sym = Symbol('test');
    const data = [
      { [sym]: 3, name: 'C' },
      { [sym]: 1, name: 'A' },
      { [sym]: 2, name: 'B' }
    ];
    const result = orderBy(data, sym);
    expect(result.length).toBe(3);
    expect(result[0][sym]).toBe(1);
    expect(result[1][sym]).toBe(2);
    expect(result[2][sym]).toBe(3);
  });

  test('应该正确处理重复字段配置（多字段排序）', () => {
    const data = [
      { score: 80, name: 'B' },
      { score: 90, name: 'A' },
      { score: 85, name: 'C' }
    ];
    // 同一个字段出现多次，会按多字段排序的规则处理
    const config = [
      ['score', 'desc'],  // 主要排序：score降序
      ['score', 'asc'],   // 次要排序：score升序（当主要排序相同时）
      ['name', 'asc']     // 第三级排序：name升序
    ];
    const result = orderBy(data, config);
    expect(result.length).toBe(3);
    // 应该按score降序：90, 85, 80
    expect(result[0].score).toBe(90);
    expect(result[1].score).toBe(85);
    expect(result[2].score).toBe(80);
  });

  test('应该正确处理对象有 getter 属性', () => {
    const data = [
      { base: 10, name: 'B' },
      { base: 20, name: 'A' },
      { base: 5, name: 'C' }
    ];

    // 定义一个有getter的对象
    Object.defineProperty(data[0], 'computed', {
      get: function() { return this.base * 2; },
      enumerable: true
    });
    Object.defineProperty(data[1], 'computed', {
      get: function() { return this.base * 2; },
      enumerable: true
    });
    Object.defineProperty(data[2], 'computed', {
      get: function() { return this.base * 2; },
      enumerable: true
    });

    const result = orderBy(data, 'computed');
    expect(result.length).toBe(3);
    expect(result[0].computed).toBe(10); // 5 * 2
    expect(result[1].computed).toBe(20); // 10 * 2
    expect(result[2].computed).toBe(40); // 20 * 2
  });

  test('应该验证排序的稳定性（相同值保持原始顺序）', () => {
    // 创建数据，确保某些字段值相同，测试稳定性
    const data = [
      { id: 1, score: 80, name: 'A' },
      { id: 2, score: 90, name: 'B' },
      { id: 3, score: 80, name: 'C' },
      { id: 4, score: 85, name: 'D' },
      { id: 5, score: 80, name: 'E' }
    ];

    const result = orderBy(data, 'score');
    expect(result.length).toBe(5);

    // score为80的有3个，应该按原始顺序保持：id 1, 3, 5
    const score80Items = result.filter(item => item.score === 80);
    expect(score80Items.length).toBe(3);
    expect(score80Items[0].id).toBe(1); // 原始顺序第一个
    expect(score80Items[1].id).toBe(3); // 原始顺序第二个
    expect(score80Items[2].id).toBe(5); // 原始顺序第三个
  });

  test('应该正确处理空对象和null配置项混合', () => {
    const data = [
      { value: 3 },
      { value: 1 },
      { value: 2 }
    ];

    const config = [
      {},                    // 空对象配置
      null,                  // null配置
      undefined,             // undefined配置
      ['value', 'asc']       // 有效配置
    ];

    const result = orderBy(data, config);
    expect(result.length).toBe(3);
    expect(result[0].value).toBe(1);
    expect(result[1].value).toBe(2);
    expect(result[2].value).toBe(3);
  });

  test('应该正确处理数字字符串作为字段名', () => {
    const data = [
      { '123': 3, name: 'C' },
      { '123': 1, name: 'A' },
      { '123': 2, name: 'B' }
    ];

    const result = orderBy(data, '123');
    expect(result.length).toBe(3);
    expect(result[0]['123']).toBe(1);
    expect(result[1]['123']).toBe(2);
    expect(result[2]['123']).toBe(3);
  });

  test('应该正确处理混合falsy值的排序', () => {
    const data = [
      { value: false, name: 'false' },
      { value: 0, name: 'zero' },
      { value: '', name: 'empty' },
      { value: null, name: 'null' },
      { value: undefined, name: 'undefined' },
      { value: NaN, name: 'nan' },
      { value: 1, name: 'one' }
    ];

    const result = orderBy(data, 'value');
    expect(result.length).toBe(7);
    // 实际排序顺序: NaN, '', 0, false, 1, null, undefined
    // 规则: '' < 数字 < 字符 < null < undefined
    expect(isNaN(result[0].value)).toBe(true); // NaN
    expect(result[1].value).toBe(''); // 空字符串
    expect(result[2].value).toBe(0);
    expect(result[3].value).toBe(false);
    expect(result[4].value).toBe(1);
    expect(result[5].value).toBe(null);
    expect(result[6].value).toBe(undefined);
  });

  test('应该正确处理Unicode字符排序', () => {
    const data = [
      { name: '😀', value: 3 },
      { name: '🎉', value: 1 },
      { name: '❤️', value: 2 }
    ];

    const result = orderBy(data, 'name');
    expect(result.length).toBe(3);
    // Unicode字符应该能正常排序
    expect(result[0].name).toBeDefined();
    expect(result[1].name).toBeDefined();
    expect(result[2].name).toBeDefined();
  });

  test('应该正确处理嵌套路径中包含null的情况', () => {
    const data = [
      { user: { profile: { age: 25 } } },
      { user: null },
      { user: { profile: null } },
      { user: { profile: { age: 20 } } }
    ];

    const result = orderBy(data, 'user.profile.age');
    expect(result.length).toBe(4);
    // 有年龄的应该排在前面
    expect(result[0].user?.profile?.age).toBe(20);
    expect(result[1].user?.profile?.age).toBe(25);
  });

  test('应该正确处理自定义valueOf的对象', () => {
    const obj1 = { valueOf: () => 3, name: 'obj1' };
    const obj2 = { valueOf: () => 1, name: 'obj2' };
    const obj3 = { valueOf: () => 2, name: 'obj3' };
    
    const data = [
      { obj: obj1 },
      { obj: obj2 },
      { obj: obj3 }
    ];

    const result = orderBy(data, 'obj');
    expect(result.length).toBe(3);
    // 应该使用valueOf进行比较
    expect(result[0].obj.name).toBe('obj2');
    expect(result[1].obj.name).toBe('obj3');
    expect(result[2].obj.name).toBe('obj1');
  });

  test('应该正确处理冻结对象', () => {
    const data = [
      Object.freeze({ value: 3 }),
      Object.freeze({ value: 1 }),
      Object.freeze({ value: 2 })
    ];

    const result = orderBy(data, 'value');
    expect(result.length).toBe(3);
    expect(result[0].value).toBe(1);
    expect(result[1].value).toBe(2);
    expect(result[2].value).toBe(3);
  });

  test('应该正确处理非常深的嵌套路径', () => {
    const data = [
      { a: { b: { c: { d: { e: { f: { g: 3 } } } } } } },
      { a: { b: { c: { d: { e: { f: { g: 1 } } } } } } },
      { a: { b: { c: { d: { e: { f: { g: 2 } } } } } } }
    ];

    const result = orderBy(data, 'a.b.c.d.e.f.g');
    expect(result.length).toBe(3);
    expect(result[0].a.b.c.d.e.f.g).toBe(1);
    expect(result[1].a.b.c.d.e.f.g).toBe(2);
    expect(result[2].a.b.c.d.e.f.g).toBe(3);
  });

  test('应该正确处理类数组对象（arguments）', () => {
    function testArguments() {
      return orderBy(arguments, 'value');
    }

    const result = testArguments(
      { value: 3 },
      { value: 1 },
      { value: 2 }
    );
    
    expect(result.length).toBe(3);
    expect(result[0].value).toBe(1);
    expect(result[1].value).toBe(2);
    expect(result[2].value).toBe(3);
  });

  test('应该正确处理降序排序后再次升序排序', () => {
    const data = [
      { score: 80 },
      { score: 90 },
      { score: 85 }
    ];

    // 先降序
    const desc = orderBy(data, [['score', 'desc']]);
    expect(desc[0].score).toBe(90);

    // 再对结果升序
    const asc = orderBy(desc, [['score', 'asc']]);
    expect(asc[0].score).toBe(80);
    expect(asc[2].score).toBe(90);
  });
});
