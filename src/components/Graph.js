
import React, { useEffect, useState } from 'react';

const graphId = "jsroot-graph";

const Graph = ({ x, y, xTitle, yTitle }) => {

    const src = 'https://root.cern.ch/js/latest/scripts/JSRoot.core.js';
    const [JSROOT, setJSROOT] = useState();
    const [graphingAvailable, setGraphingAvailable] = useState(false);

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

    let graph = JSROOT.createTGraph(x.length, x, y);
    window.graph = graph
    graph.fLineColor = 2;
    graph.fMarkerSize = 2;
    graph.fTitle = "Gas Graphs"

    JSROOT.redraw(graphId, graph, "").then(() => {
        if (graph.fHistogram) {
            graph.fHistogram.fXaxis.fTitle = xTitle;
            graph.fHistogram.fYaxis.fTitle = yTitle;
        }
    });

    return (<div id={graphId} style={{ width: "100%", height: "800px" }} />)
}

export default Graph;