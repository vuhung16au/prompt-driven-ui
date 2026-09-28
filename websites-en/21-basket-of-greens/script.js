// State
let state = {
    people: 2,
    meals: 3,
    substitutionsMade: 0,
    maxSubstitutions: 1,
    items: [
        { id: 'item1', name: 'Mustard Greens', amount2_3: 300, amount2_5: 500, amount4_3: 600, amount4_5: 1000, unit: 'g', pricePer100g: 0.40, img: 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=150&h=150&fit=crop' },
        { id: 'item2', name: 'Tomatoes', amount2_3: 400, amount2_5: 600, amount4_3: 800, amount4_5: 1200, unit: 'g', pricePer100g: 0.50, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop' },
        { id: 'item3', name: 'Squash', amount2_3: 500, amount2_5: 800, amount4_3: 1000, amount4_5: 1500, unit: 'g', pricePer100g: 0.30, img: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=150&h=150&fit=crop' },
        { id: 'item4', name: 'Oyster Mushrooms', amount2_3: 300, amount2_5: 500, amount4_3: 600, amount4_5: 1000, unit: 'g', pricePer100g: 0.80, img: 'https://images.unsplash.com/photo-1613264426577-03f90e9d48fc?w=150&h=150&fit=crop' }
    ],
    swapOptions: [
        { id: 'swap1', name: 'Spinach', unit: 'g', pricePer100g: 0.45, img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=150&h=150&fit=crop' },
        { id: 'swap2', name: 'Cucumbers', unit: 'g', pricePer100g: 0.35, img: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=150&h=150&fit=crop' },
        { id: 'swap3', name: 'Cabbage', unit: 'g', pricePer100g: 0.25, img: 'https://images.unsplash.com/photo-1518972553051-7f152d1c6812?w=150&h=150&fit=crop' }
    ],
    currentItemToSwap: null
};

// Original state to reset
const defaultItems = JSON.parse(JSON.stringify(state.items));

// Format currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};

// Calculate current amounts based on people/meals
const getAmount = (item) => {
    const key = `amount${state.people}_${state.meals}`;
    return item[key] || item.currentAmount; // Fallback for swapped items
};

// Update UI Buttons
const updateButtons = () => {
    document.getElementById('btn-people-2').className = state.people === 2 
        ? "flex-1 py-3 px-4 rounded-2xl border-2 border-primary bg-primary text-white font-bold transition-all hover:scale-105 active:scale-95" 
        : "flex-1 py-3 px-4 rounded-2xl border-2 border-[#DED8CF] text-[#2C2C24] font-bold transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95";
    
    document.getElementById('btn-people-4').className = state.people === 4 
        ? "flex-1 py-3 px-4 rounded-2xl border-2 border-primary bg-primary text-white font-bold transition-all hover:scale-105 active:scale-95" 
        : "flex-1 py-3 px-4 rounded-2xl border-2 border-[#DED8CF] text-[#2C2C24] font-bold transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95";

    document.getElementById('btn-meals-3').className = state.meals === 3 
        ? "flex-1 py-3 px-4 rounded-2xl border-2 border-primary bg-primary text-white font-bold transition-all hover:scale-105 active:scale-95" 
        : "flex-1 py-3 px-4 rounded-2xl border-2 border-[#DED8CF] text-[#2C2C24] font-bold transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95";
    
    document.getElementById('btn-meals-5').className = state.meals === 5 
        ? "flex-1 py-3 px-4 rounded-2xl border-2 border-primary bg-primary text-white font-bold transition-all hover:scale-105 active:scale-95" 
        : "flex-1 py-3 px-4 rounded-2xl border-2 border-[#DED8CF] text-[#2C2C24] font-bold transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95";
};

// Render Items
const renderItems = () => {
    const container = document.getElementById('basket-items');
    // apply crossfade using simple opacity
    container.style.opacity = 0;
    
    setTimeout(() => {
        container.innerHTML = '';
        let totalPrice = 0;
        let totalWeight = 0;

        state.items.forEach(item => {
            const amount = getAmount(item);
            const itemPrice = (amount / 100) * item.pricePer100g;
            totalPrice += itemPrice;
            totalWeight += amount;

            const div = document.createElement('div');
            div.className = "flex items-center gap-4 p-4 rounded-2xl border border-[#DED8CF]/50 bg-white shadow-sm hover:shadow-soft transition-all";
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover">
                <div class="flex-1">
                    <h4 class="font-bold text-lg">${item.name}</h4>
                    <p class="text-sm text-[#78786C]">${amount}${item.unit} • ${formatPrice(itemPrice)}</p>
                </div>
                ${state.substitutionsMade < state.maxSubstitutions ? 
                    `<button onclick="openSwap('${item.id}')" class="text-sm font-semibold text-primary hover:underline px-3 py-2 bg-primary/5 rounded-lg transition-colors hover:bg-primary/10">Swap item</button>` 
                    : `<span class="text-xs text-[#78786C] bg-stone-100 px-2 py-1 rounded">Swapped</span>`
                }
            `;
            container.appendChild(div);
        });

        // Update Summary
        document.getElementById('summary-size').innerText = `${state.people} people, ${state.meals} meals`;
        document.getElementById('summary-count').innerText = `${state.items.length} items`;
        document.getElementById('summary-weight').innerText = `${(totalWeight / 1000).toFixed(1)} kg`;
        document.getElementById('summary-price').innerText = formatPrice(totalPrice);

        container.style.opacity = 1;
    }, 200); // 200ms crossfade
};

// Setters
const setPeople = (num) => {
    state.people = num;
    updateButtons();
    // Update amount for swapped items if any
    state.items.forEach(item => {
        if(!item.amount2_3) { // It's a swapped item
             const idx = state.items.indexOf(item);
             const original = defaultItems[idx];
             item.currentAmount = original[`amount${state.people}_${state.meals}`];
        }
    });
    renderItems();
};

const setMeals = (num) => {
    state.meals = num;
    updateButtons();
    // Update amount for swapped items if any
    state.items.forEach(item => {
        if(!item.amount2_3) { // It's a swapped item
             const idx = state.items.indexOf(item);
             const original = defaultItems[idx];
             item.currentAmount = original[`amount${state.people}_${state.meals}`];
        }
    });
    renderItems();
};

// Swap Logic
const openSwap = (itemId) => {
    if (state.substitutionsMade >= state.maxSubstitutions) return;
    
    state.currentItemToSwap = itemId;
    const panel = document.getElementById('swap-panel');
    const optionsContainer = document.getElementById('swap-options');
    const itemToReplace = state.items.find(i => i.id === itemId);
    
    document.getElementById('swap-title').innerText = `Swap "${itemToReplace.name}" for:`;
    
    optionsContainer.innerHTML = '';
    state.swapOptions.forEach(opt => {
        const amount = getAmount(itemToReplace); // adopt amount of the item being replaced
        const price = (amount / 100) * opt.pricePer100g;
        
        const div = document.createElement('div');
        div.className = "flex items-center gap-3 p-3 rounded-xl border border-[#DED8CF]/50 hover:border-primary cursor-pointer transition-colors";
        div.onclick = () => confirmSwap(opt);
        div.innerHTML = `
            <img src="${opt.img}" alt="${opt.name}" class="w-12 h-12 rounded-lg object-cover">
            <div>
                <h5 class="font-bold text-sm">${opt.name}</h5>
                <p class="text-xs text-[#78786C]">${formatPrice(price - ((amount/100)*itemToReplace.pricePer100g) >= 0 ? '+' : '')}${formatPrice(price - ((amount/100)*itemToReplace.pricePer100g))}</p>
            </div>
        `;
        optionsContainer.appendChild(div);
    });
    
    panel.classList.remove('hidden');
};

const confirmSwap = (newItem) => {
    const idx = state.items.findIndex(i => i.id === state.currentItemToSwap);
    const amount = getAmount(state.items[idx]); // get current amount
    
    state.items[idx] = {
        ...newItem,
        currentAmount: amount // Store fixed amount based on current scale
    };
    
    state.substitutionsMade++;
    closeSwap();
    renderItems();
};

const closeSwap = () => {
    document.getElementById('swap-panel').classList.add('hidden');
    state.currentItemToSwap = null;
};

const resetBasket = () => {
    state.items = JSON.parse(JSON.stringify(defaultItems));
    state.substitutionsMade = 0;
    closeSwap();
    renderItems();
};

// Initialize
updateButtons();
renderItems();
