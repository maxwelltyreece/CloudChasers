public void transfer(Inventory inv_1, Inventory inv_2){

    synchronized(inv_1){
        synchronized(inv_2){
            String itemNAme =inv1.getItemName(id)l;
            inv1.remove(id);
            inv2.add(itemName,id);
        }
    }

}

// This is wrong because if 2 threads do this, 1 will take inv_1 lock, the other takes
// inv_2 lock, then its deadlock because you cant use either

private stati void
inventory first = inv1;
inventory second = inv2;
if (first.getName().compareTo((second.getName())) < 0){
    first = inv2;
    second = inv1;
    
}