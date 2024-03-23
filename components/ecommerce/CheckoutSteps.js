
import { Tabs } from 'flowbite-react';



function CheckoutSteps({step2, active2, step3, active3}) {
    
  return (
        <Tabs.Group
        aria-label="Full width tabs"
        style="fullWidth"
        className='center text-center auto'
        >   
            
            <Tabs.Item
            title="Cart"
            >
            </Tabs.Item>
            
            
            { step2 && active2 ? 
            <Tabs.Item
            active
            title="Shipping"
            >
            </Tabs.Item>
            :
            step2 ? 
            <Tabs.Item
            title="Shipping"
            >
            </Tabs.Item>
            :
            <Tabs.Item
            disabled
            title="Shipping"
            >
            </Tabs.Item>
            }

            {
            
            step3 && active3 ? 
            
            <Tabs.Item
            active
            title="Payment"
            >
            </Tabs.Item>
            :
            step3 ? 
            
            <Tabs.Item
            disabled
            title="Payment"
            >
            </Tabs.Item>
            :
            <Tabs.Item
            disabled
            title="Payment"
            >
            </Tabs.Item>
            }
            
        </Tabs.Group>
  )
}

export default CheckoutSteps
