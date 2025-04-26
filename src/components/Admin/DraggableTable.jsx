src/components/Admin/DraggableTable.jsx
```

```javascript
import React from 'react';

const DraggableTable = () => {
  return (
    <div>
      {/* Draggable table content goes here */}
    </div>
  );
};

export default DraggableTable;
```

```javascript
src/components/Admin/EditableCell.jsx
```

```javascript
import React from 'react';

const EditableCell = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default EditableCell;
```

```
diff
--- a/src/components/Admin/AdminDashboard.jsx
+++ b/src/components/Admin/AdminDashboard.jsx
@@ -1,6 +1,6 @@
 import React from 'react';
 import TabNavigation from './TabNavigation';
-import DraggableTable from './components/DraggableTable';
+import DraggableTable from './DraggableTable';
 import ProductTable from './ProductTable';
 
 const AdminDashboard = () => {
```

```
diff
--- a/src/components/Admin/ProductRowEdit.jsx
+++ b/src/components/Admin/ProductRowEdit.jsx
@@ -2,7 +2,7 @@
 import { useState } from 'react';
 import { useForm } from 'react-hook-form';
 import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/outline';
-import EditableCell from './components/EditableCell';
+import EditableCell from './EditableCell';
 import ImageUploader from './ImageUploader';
 import { useProductSaver } from '../Admin/hooks/useProductSaver';
 import { useProducts } from '../../hooks/useProducts';