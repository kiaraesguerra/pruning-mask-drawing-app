# Mask Drawing App


* The webpage contains:
  * Upload button (for the PyTorch file)
  * Drawing Area
  * Clear button (to clear the drawing)
  * Done button (to finish
  * Menu to select the layer of interest which the user will be drawing the mask for
 
* Workflow:
  * User uploads the source code of a PyTorch deep learning model
  * The layers of the model will be extracted.
  * The menu will contain the layers of the model
  * User will select the layer. The drawing area will adjust based on the dimensions of the layer.
  * The user will draw the structure of the layer.
  * Once done, the user will press 'done'.
  * The user will do this for all of the layers of interest.
  * After all the masks have been drawn, the user will press 'prune'.
  * The pruned model will be returned as a .pt file.
