const mappers = require("./mappers.js");

const p = { 
    "mapping": {
        "STAY": "0",
        "AWAY": "1",
        "INT": 1234353,
    }
}
const staticMapper = new mappers.StaticMapper(p)

test.each`
    a           | expected
    ${"STAY"}   | ${"0"}
    ${"AWAY"}   | ${"1"}
    ${"N/A"}    | ${"N/A"}
    ${"INT"}    | ${1234353}
`('returns $expected when $a given', ({a, expected}) => {
    expect(staticMapper.map(a)).toBe(expected);
});

const remap = "Math.round((value - 30) * (100 - 0) / (99 - 30) + 0)"

test.each`
    a                               | b         | expected
    ${"2 + value"}                  | ${1}      | ${3}
    ${"value < 30 ? 0 : " + remap}  | ${10}     | ${0} 
    ${"value < 30 ? 0 : " + remap}  | ${50}     | ${29} 
    ${"value < 30 ? 0 : " + remap}  | ${99}     | ${100} 
    ${"value === \"OK\" ? 1 : 0"}     | ${"OK"}   | ${1}
`('returns $expected when value is $b and expression is $a', ({a, b, expected}) => {
    const p = {
        "expression": a
    }
    const evalMapper = new mappers.EvalMapper(p)

    expect(evalMapper.map(b)).toBe(expected);
});

