import { Router }
from "express";

import {
 createSubscriptionController,
 getSubscriptionController,
 updateSubscriptionController,
 deleteSubscriptionController,
 getAllSubscriptionsController,
 createOrderController
}
from "./subscription.controller";

import {
 razorpayWebhook
}
from "./webhook.controller";

const router =
Router();

router.post(
"/",
createSubscriptionController
);

router.get(
"/workspace/:workspaceId",
getSubscriptionController
);

router.get(
"/",
getAllSubscriptionsController
);

router.put(
"/:id",
updateSubscriptionController
);

router.delete(
"/:id",
deleteSubscriptionController
);

router.post(
"/create-order",
createOrderController
);

router.post(
"/webhook",
razorpayWebhook
);

export default router;