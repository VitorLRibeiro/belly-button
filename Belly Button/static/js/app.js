


function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  d3.json("samples.json").then(function(data) {
    var dataName = data.metadata
    for (var i=0, len = dataName.length; i < len; i++) {
      if (dataName[i].id == sample) {
        var gaugeNumber = dataName[i].wfreq
        var sampleMeta = d3.select("#sample-metadata").html("")
        for (let [key, value] of Object.entries(dataName[i])) {
          sampleMeta.append("p").text(`${key}: ${value}`)
        
        };
      };
    };
    
    
    // BONUS: Build the Gauge Chart
    // Could fully render Gauge


  });
}

function buildCharts(sample) {
  d3.json("samples.json").then(function(data) {
    var data = data.samples;
    var len = data.length
    for (var i=0; i < len; i++) {
      if (data[i].id == sample) {
        var id = data[i].id;
        var sample_values = (data[i].sample_values);
        var otu_ids = (data[i].otu_ids);
        var otu_labels = (data[i].otu_labels);
      
        // Build Bar Chart
        var dataBar = [{
          type: 'bar',
          x: sample_values.slice(0,10),
          y: otu_ids.slice(0,10).map(x => `OTU ${x}`),
          text: otu_labels.slice(0,10).map(l => `OTU ${l}`),
          orientation: 'h'
        }];
        
        Plotly.newPlot('bar', dataBar);
        
        //Build Bubble Chart
        var dataBubble = [{
          y: sample_values,
          x: otu_ids,
          mode: 'markers',
          text: data[i].otu_labels.map(l => `OTU ${l}`),
          marker: {
            size: data[i].sample_values.map(b => b),
            color: otu_ids
          }
        }];
        
        Plotly.newPlot('bubble', dataBubble);

      }
      else{

      }
    }
    
  });  

};

function init() {
  // Drop Down Reference
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    data.names.forEach((name) => {
      selector
        .append("option")
        .text(name)
        .property("value", name);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = data.names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();