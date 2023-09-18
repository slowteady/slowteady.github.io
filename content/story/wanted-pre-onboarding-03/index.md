---
title: 원티드 프리온보딩 프론트엔드 인턴십 4주차 회고
date: '2023-09-16 00:00:00'
author: 이용민
tags: 회고 원티드 프리온보딩
categories: story
---

## 원티드 프리온보딩 프론트엔드 인턴십 4주차 회고

4주차에는 코드 리뷰, 소프트웨어 테스트, 실행 컨텍스트와 클로저에 대해 배웠다.

### 1. 코드 리뷰

#### 1-1. Default Value 설정

```ts
function List() {
  const display = useDisplay();
  const data = useDiseasStore();

  const { isOnIndex, ulRef } = useListNavigation(data?.length || 0, display?.isFocused || false);

  return (
    .
    .
    .
  );
}

export default List;

function useListNavigation(dataLength: number, isFocused: boolean) {
  const [isOnIndex, setIsOnIndex] = useState(INITIAL_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);
```

```ts
function List() {
  const display = useDisplay();
  const data = useDiseasStore();

  const { isOnIndex, ulRef } = useListNavigation(data?.length, display?.isFocused);

  return (
    .
    .
    .
  );
}

export default List;

function useListNavigation(dataLength: number = 0, isFocused: boolean = false) {
  const [isOnIndex, setIsOnIndex] = useState(INITIAL_INDEX);
  const ulRef = useRef<HTMLUListElement>(null);

```

- 함수를 호출할 때 기본값을 설정하는 것 보다 Parameter의 기본값을 설정하여 사용하는 것이 함수 호출 시에 매번 기본값을 설정하지 않아도 되고 코드 가독성에도 좋다.

#### 1-2. Debounce value vs function

Debounce를 구현한 로직이 onChange를 통한 값의 변화를 Debounce 시키는 방법과 요청을 보내는 함수 자체를 Debounce 시키는 방법으로 나뉘었었다.

> 이 중 더 효율적인 방법은 **함수 자체를 Debounce** 하는 방법이다.

- value를 debounce 하는 방법은 state를 하나 더 사용해야한다.

  1. 불필요한 렌더링이 일어난다.
  2. 연쇄적인 변화 방법을 사용하기 때문에 로직 파악이 어려워진다.
  3. 목적 자체가 결국 함수의 실행을 debounce 처리하는 것이기 때문에 value를 debounce 하는 것은 실질적인 목적에 부합하지 않는다.

#### 1-3. 변수명에 구체 포함 지양

```ts
class AxiosClient {
  .
  .
  .
}

export const axios = new AxiosClient(API_BASE_URL);
```

- axios라는 변수명으로 사용하게되면 axios라는 라이브러리를 사용했다는 것을 암시하기 때문에 구체가 포함된다.
- 예를 들어, http 요청 라이브러리를 바꾸게 된다면 의미가 변하게 되기 때문에 변수명의 수정이 불가피해진다는 것이다.

```ts
class AxiosClient {
  .
  .
  .
}

export const httpClient = new AxiosClient(API_BASE_URL);
```

- 위와 같이 구체를 포함하지 않는 포괄적인 변수명을 사용하는 것이 보다 변경에 유연할 수 있는 방법이다.

#### 1-4. DOM을 통한 값 전달 지양

```ts
function BarChart({ chartValues, chartTimes }: ChartProps) {
  const { filteringId, setFilteringId } = useFiltering();

  const filterByBar: MouseEventHandler<HTMLLIElement> = ({ currentTarget }) => {
    setFilteringId(currentTarget.dataset.id || "");
  };

  return (
    <BarChartWrapper>
      {chartValues.map((chartValue, idx) => (
        <Bar
          key={chartTimes[idx]}
          $valueBar={chartValue.value_bar}
          $isFilterd={chartValue.id === filteringId}
          onClick={filterByBar}
          data-id={chartValue.id}
        >
          <ToolTip chartValue={chartValue} />
        </Bar>
      ))}
    </BarChartWrapper>
  );
}
```

- data-id 프로퍼티를 통해 값을 핸들링했는데, DOM을 통해 값을 전달 하는것은 데이터가 노출되기도 하고 버그 발생의 여지가 생긴다.

```ts
function BarChart({ chartValues, chartTimes }: ChartProps) {
  const { filteringId, setFilteringId } = useFiltering();

  const filterByBar = (chartId: ChartValue["id"]) => {
    setFilteringId(chartId);
  };

  return (
    <BarChartWrapper>
      {chartValues.map((chartValue, idx) => (
        <Bar
          key={chartTimes[idx]}
          $valueBar={chartValue.value_bar}
          $isFilterd={chartValue.id === filteringId}
          onClick={() => filterByBar(chartValue.id)}
        >
          <ToolTip chartValue={chartValue} />
        </Bar>
      ))}
    </BarChartWrapper>
  );
}
```

- onClick 함수에서 인자를 전달하여 처리하면 위의 단점을 상쇄시키고 한번에 처리가 가능하다.

#### 1-5. 추상화 수준 맞추기

```ts
function Chart({ tabButtonKey }: { tabButtonKey: string }) {
  return (
    <S_Container>
      <S_ButtonList>
        {idArr.map((v) => (
          <S_Button
            key={v}
            $selected={v === selectedButton}
            id={v}
            type="button"
            onClick={() => {
              setSelectedButton(v);
            }}
          >
            {v}
          </S_Button>
        ))}
      </S_ButtonList>
      <ComposedChart
        data={composeChartData}
        height={1000}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
        width={1300}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="time" scale="band" />
        <YAxis
          dataKey="value_area"
          label={{ value: "Area", angle: -90, position: "insideLeft" }}
          orientation="left"
          yAxisId="Area"
        />
        <YAxis
          dataKey="value_bar"
          label={{ value: "Bar", angle: -90, position: "insideRight" }}
          orientation="right"
          yAxisId="Bar"
        />
        <Area
          dataKey="value_area"
          fill="#84d884"
          stroke="#8f9908"
          type="monotone"
          yAxisId="Area"
        />
        <Bar
          barSize={20}
          dataKey="value_bar"
          fill="#413ea0"
          offset={40}
          yAxisId="Bar"
        >
          {composeChartData.map((entry, index) => {
            const selected = entry.id === selectedButton;
            return (
              <Cell
                key={`cell-${index}`}
                fill={selected ? "blue" : "yellow"}
                onClick={() => {
                  setSelectedButton(entry.id);
                }}
              />
            );
          })}
        </Bar>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </ComposedChart>
    </S_Container>
  );
}
```

- 어떤 컴포넌트는 map 함수를 통해 렌더링을 하고, 어떤 컴포넌트를 props를 받고, props를 받지 않고 사용하는 컴포넌트도 있는데 이는 추상화 수준이 맞지 않다고 볼 수 있다.

```ts
function App() {
  return (
    <div className="App">
      <FilteringButtons />
      <ChartWrapper>
        <AreaYAxis />
        <Charts>
          <BarChart chartValues={chartValues} chartTimes={chartTimes} />
          <AreaChart chartValues={chartValues} chartTimes={chartTimes} />
        </Charts>
        <BarYAxis />
        <XAxis chartTimes={chartTimes} />
      </ChartWrapper>
      <ChartLegends />
    </div>
  );
}
```

- 추상화 수준을 맞춰 분기처리를 하면, 코드의 가독성이 향상되고 직관적으로 이해 시킬 수 있다.

---
