export const success = (res, data) => {
  return res.json({ success: true, data });
};

export const error = (res, err) => {
  console.error(err);
  return res.status(500).json({
    success: false,
    error: err.message,
  });
};