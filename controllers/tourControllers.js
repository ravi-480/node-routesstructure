const fs = require("fs");




const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
  
  const getAllTours = (req, res) => {
    res.status(200).json({
      status: "success",
      length: tours.length,
      data: tours,
    });
  };
  
  const postData = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      () => {
        console.log("done");
      }
    );
    res.status(201).json({
      status: "success",
      data: tours,
    });
  };
  
  const getSingleData = async (req, res) => {
    const id = req.params.id * 1;
    const data = await tours.find((tour) => tour.id == id);
    if (!data)
      return res.status(404).json({ status: "failed", msg: "id not found" });
  
    res.status(200).json({
      status: "success",
      data: data,
    });
  };
  
  const updateData = async (req, res) => {
    const id = req.params.id * 1;
    const data = tours.find((tour) => tour.id == id);
    if (!data)
      return res.status(404).json({ status: "failed", msg: "enter valid id" });
    Object.assign(data, req.body);
    res.status(201).json({ status: "sucess", data: data });
  };
  
  module.exports = {getAllTours,getSingleData,postData,updateData}