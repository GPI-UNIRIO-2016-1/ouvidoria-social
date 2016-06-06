/**
 * Created by urielbertoche on 5/30/2016.
 */

function attachTagCloud(req,res,next) {
  var words = [
    {text: "CCET", weight: 10},
    {text: "BSI", weight: 8},
    {text: "TI", weight: 7},
    {text: "UNIRIO", weight: 8},
    {text: "Banheiro", weight: 7},
    {text: "Elevador", weight: 6},
    {text: "Água", weight: 5},
    {text: "Wi-fi", weight: 4},
    {text: "Sit", weight: 8},
    {text: "Amet", weight: 6.2},
    {text: "Consectetur", weight: 5},
    {text: "Adipiscing", weight: 5}
  ];

  res.locals.words = words;

  next();
}

module.exports = attachTagCloud;