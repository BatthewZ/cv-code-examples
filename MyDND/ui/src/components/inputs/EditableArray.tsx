import {EditableText} from './EditableText';

type InventoryProps = {
  items: string[];
  addItem: Function;
  deleteItem: (itemName: string) => void;
  updateItem: (oldName: string, newName: string) => void;
};

export const EditableArray: React.FC<InventoryProps> = ({items, addItem, deleteItem, updateItem}: InventoryProps) => {
  function mapRows() {
    return items.map((i) => {
      return (
        <tr key={i + '-invent-tr'}>
          <td>
            <EditableText
              fieldName={i}
              value={i}
              confirmEdit={(e: string) => {
                updateItem(i, e);
              }}
            />
          </td>
          <td style={{width: '50%'}}>
            <button onClick={() => deleteItem(i)}>Delete Item</button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className='column centerChildren'>
      <table>
        <>{mapRows()}</>
      </table>
      <div>
        <button onClick={() => addItem()}>Add Item</button>
      </div>
    </div>
  );
};
