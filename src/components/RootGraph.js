
import React, { useEffect, useState } from 'react';

const graphId = "jsroot-graph";

const Graph = ({ xData = [], yData = [], xTitle = "", yTitle = "" }) => {

    const src = 'https://root.cern.ch/js/latest/scripts/JSRoot.core.js';
    const [JSROOT, setJSROOT] = useState();
    const [graphingAvailable, setGraphingAvailable] = useState(false);

    // render component on resize
    const [, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
    const updateWindowSize = () => {
        setWindowSize([window.innerWidth, window.innerHeight])
    }
    useEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        return () => {
            window.removeEventListener('resize', updateWindowSize)
        }
    }, [])

    useEffect(() => {
        if (window && document) {
            const script = document.createElement('script')
            const body = document.getElementsByTagName('body')[0]
            script.src = src
            script.type = 'module'
            script.async = true
            body.appendChild(script)
            script.addEventListener('load', () => {
                setJSROOT(window.JSROOT)
            })
        }
    }, [src])

    useEffect(() => {
        if (!graphingAvailable) {
            const interval = setInterval(() => {
                if (JSROOT && JSROOT.createTGraph) {
                    setGraphingAvailable(true)
                }
            }, 200);
            return () => clearInterval(interval);
        }
    }, [JSROOT, graphingAvailable]);

    if (!graphingAvailable) {
        return;
    }

    if (!xData || !yData || xData.length !== yData.length) {
        return;
    }

    const graphs = xData.map((x, index) => {
        const y = yData[index];
        let graph = JSROOT.createTGraph(x.length, x, y);
        graph.fLineColor = 2;
        graph.fMarkerSize = 2;
        window.graph = graph
        return graph
    })

    let multiGraph = JSROOT.createTMultiGraph(...graphs);
    // multiGraph.fTitle = "Gas Graphs"

    JSROOT.redraw(graphId, multiGraph, "").then(() => {
        if (multiGraph.fHistogram) {
            //graph.fHistogram.fXaxis.fTitle = xTitle;
            //graph.fHistogram.fYaxis.fTitle = yTitle;
        }
    });

    return (<div id={graphId} style={{ width: "100%", height: "600px" }} />)
}

export default Graph;