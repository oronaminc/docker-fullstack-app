import React, { useRef, useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { Brush } from '@visx/brush';
import { Bounds } from '@visx/brush/lib/types';
import BaseBrush, { BaseBrushState, UpdateBrush } from '@visx/brush/lib/BaseBrush';
import { PatternLines } from '@visx/pattern';
import { LinearGradient } from '@visx/gradient';
import { max, extent } from 'd3-array';
// import { dto } from './dto';
import data, {dto} from './data/data';
import AreaChart from './AreaChart';
import {Button} from 'react-bootstrap';

// Initialize some variables
let stock = appleStock.slice(1000);
// let stock: Array<dto> = [{'close':0,'date':new Date().toISOString()}];
// stock = data;
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const chartSeparation = 30;
const PATTERN_ID = 'brush_pattern';
const GRADIENT_ID = 'brush_gradient';
// export const accentColor = '#f6acc8';
// export const background = '#584153';
// export const background2 = '#af8baf';
export const accentColor = '#004d7a';
export const background = '#008793';
export const background2 = '#A8EB12';
const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  stroke: 'white',
};

// accessors
// const getDate2 = (d: AppleStock) => new Date(d.date);
// const getStockValue2 = (d: AppleStock) => d.close;
const dd = {'close':0,'date':new Date().toISOString()};
let getStockValue = (d: dto) => d.close;
let getDate = (d: dto) => new Date(d.date);

export type BrushProps = {
  width: number;
  height: number;
  test: Array<dto>;
  margin?: { top: number; right: number; bottom: number; left: number };
  compact?: boolean;
};


function BrushChart({
  compact = false,
  width,
  height,
  test, //= [{'close':0,'date':new Date().toISOString()}],
  margin = {
    top: 20,
    left: 50,
    bottom: 20,
    right: 20,
  },
}: BrushProps) {
  
  // const getDate = (d: dto) => new Date(d.date);
  // const getStockValue = (d: dto) => d.time;
  if(test.length !== 0) {
    stock = test;  
  }
  const brushRef = useRef<BaseBrush | null>(null);
  const [filteredStock, setFilteredStock] = useState(stock);
  const [originStock, setOriginStock] = useState(stock);
  

  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return;
    const { x0, x1, y0, y1 } = domain;
    const stockCopy = stock.filter(s => {
      const x = getDate(s).getTime();
      const y = getStockValue(s);
      return x > x0 && x < x1 && y > y0 && y < y1;
    });
    setFilteredStock(stockCopy);
    // setOriginStock(stock);    
  };

  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = compact ? chartSeparation / 2 : chartSeparation + 10;
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
  const bottomChartHeight = innerHeight - topChartHeight - chartSeparation;

  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0);

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(filteredStock, getDate) as [Date, Date],
      }),
    [xMax, filteredStock],
  );
  const stockScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, max(filteredStock, getStockValue) || 0],
        nice: true,
      }),
    [yMax, filteredStock],
  );
  const brushDateScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xBrushMax],
        domain: extent(originStock, getDate) as [Date, Date],
      }),      
    [xBrushMax, originStock],
  );
  const brushStockScale = useMemo(
    () =>
      scaleLinear({
        range: [yBrushMax, 0],
        domain: [0, max(originStock, getStockValue) || 0],
        nice: true,
      }),
    [yBrushMax, originStock],
  );

  const initialBrushPosition = useMemo(
    () => ({
      start: { x: brushDateScale(getDate(stock[stock.length-3])) },
      end: { x: brushDateScale(getDate(stock[stock.length-1])) },
    }),
    [brushDateScale],
  );

  // event handlers
  const handleClearClick = () => {
    if (brushRef?.current) {
      setFilteredStock(stock);
      setOriginStock(stock);
      brushRef.current.reset();
    }
  };

  const handleResetClick = () => {
    setFilteredStock(stock);
    setOriginStock(stock);
    if (brushRef?.current) {
      const updater: UpdateBrush = prevBrush => {
        const newExtent = brushRef.current!.getExtent(
          initialBrushPosition.start,
          initialBrushPosition.end,
        );

        const newState: BaseBrushState = {
          ...prevBrush,
          start: { y: newExtent.y0, x: newExtent.x0 },
          end: { y: newExtent.y1, x: newExtent.x1 },
          extent: newExtent,
        };

        return newState;
      };
      brushRef.current.updateBrush(updater);
    }
  };

  return (
    <div>
      <svg width={width} height={height}>
        <LinearGradient id={GRADIENT_ID} from={background} to={background2} rotate={45} />
        <rect x={0} y={0} width={width} height={height} fill={`url(#${GRADIENT_ID})`} rx={14} />
        <AreaChart
          hideBottomAxis={compact}
          data={filteredStock}
          width={width}
          margin={{ ...margin, bottom: topChartBottomMargin }}
          yMax={yMax}
          xScale={dateScale}
          yScale={stockScale}
          gradientColor={background2}
        />
        <AreaChart
          hideBottomAxis
          hideLeftAxis
          data={originStock}
          width={width}
          yMax={yBrushMax}
          xScale={brushDateScale}
          yScale={brushStockScale}
          margin={brushMargin}
          top={topChartHeight + topChartBottomMargin + margin.top}
          gradientColor={background2}
        >
          <PatternLines
            id={PATTERN_ID}
            height={8}
            width={8}
            stroke={accentColor}
            strokeWidth={1}
            orientation={['diagonal']}
          />
          <Brush
            xScale={brushDateScale}
            yScale={brushStockScale}
            width={xBrushMax}
            height={yBrushMax}
            margin={brushMargin}
            handleSize={8}
            innerRef={brushRef}
            resizeTriggerAreas={['left', 'right']}
            brushDirection="horizontal"
            initialBrushPosition={initialBrushPosition}
            onChange={onBrushChange}
            onClick={() => setFilteredStock(stock)}
            selectedBoxStyle={selectedBrushStyle}
          />
        </AreaChart>
      </svg>
      <div>
        <Button onClick={handleClearClick}>데이터 불러오기</Button>&nbsp;
        <Button onClick={handleResetClick}>최근 데이터 선택</Button>
      </div>
    </div>
  );
}

export default BrushChart;
